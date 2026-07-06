'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4';

const cards = [
  {
    title: 'Engineering',
    body: 'Founding engineer at EverCurrent, building agentic AI workflows for hardware manufacturing teams. Part of a16z Speedrun.',
  },
  {
    title: 'Products',
    body: 'Shipped tools across real estate, education, and fundraising — including StudyBase (2,000+ students) and Entrelink (~$500k raised).',
  },
  {
    title: 'Focus',
    body: 'Studying Business and Data Science at UC Berkeley. Working at the intersection of AI, product, and venture.',
  },
];

export default function ScrollExperience() {
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fixedCardsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const cardsTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    const rafIds: number[] = [];
    const bitmaps: ImageBitmap[] = [];
    const cleanups: Array<() => void> = [];

    // Mobile browsers (esp. iOS Safari) can't reliably scrub a paused video
    // by seeking, and frame extraction via createImageBitmap frequently times
    // out. On those devices we simply autoplay the video on a loop so the
    // background is always visible.
    const isMobile =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // ===================== SCROLL VIDEO =====================
    const canvas = videoCanvasRef.current;
    const videoEl = videoElRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    let framesReady = false;
    let lastFrameIndex = -1;
    let videoSeeking = false;

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      lastFrameIndex = -1;
    };

    const getScrollBounds = () => {
      const vh = window.innerHeight;
      return { start: vh * 0.5, end: document.documentElement.scrollHeight - vh };
    };

    const getProgress = () => {
      const { start, end } = getScrollBounds();
      const range = end - start;
      if (range <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - start) / range));
    };

    const drawFrame = (frame: ImageBitmap) => {
      if (!canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / frame.width, ch / frame.height);
      const dw = frame.width * s;
      const dh = frame.height * s;
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const videoTick = () => {
      if (!alive) return;
      const progress = getProgress();
      if (framesReady && bitmaps.length > 0) {
        const idx = Math.round(progress * (bitmaps.length - 1));
        if (idx !== lastFrameIndex) {
          lastFrameIndex = idx;
          if (bitmaps[idx]) drawFrame(bitmaps[idx]);
        }
      } else if (
        videoEl &&
        videoEl.duration &&
        isFinite(videoEl.duration) &&
        videoEl.readyState >= 1
      ) {
        const target = progress * videoEl.duration;
        if (!videoSeeking && Math.abs(videoEl.currentTime - target) > 0.001) {
          videoSeeking = true;
          videoEl.currentTime = target;
        }
      }
      rafIds.push(requestAnimationFrame(videoTick));
    };

    const extractFrames = async () => {
      if (!canvas) return;
      try {
        const response = await fetch(VIDEO_URL, { mode: 'cors' });
        const blob = await response.blob();
        if (!alive) return;
        const objectUrl = URL.createObjectURL(blob);

        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.preload = 'auto';
        video.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject();
          setTimeout(() => reject(), 15000);
        });
        if (!alive) {
          URL.revokeObjectURL(objectUrl);
          return;
        }

        const scale = Math.min(1, 1280 / video.videoWidth);
        const scaledWidth = Math.round(video.videoWidth * scale);
        const scaledHeight = Math.round(video.videoHeight * scale);
        const frameCount = Math.max(30, Math.min(120, Math.round(video.duration * 24)));

        for (let i = 0; i < frameCount; i++) {
          if (!alive) break;
          const time = (i / (frameCount - 1)) * (video.duration - 0.05);
          video.currentTime = time;
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked);
              resolve();
            };
            video.addEventListener('seeked', onSeeked);
            setTimeout(() => {
              video.removeEventListener('seeked', onSeeked);
              reject();
            }, 3000);
          });
          const bitmap = await createImageBitmap(video, {
            resizeWidth: scaledWidth,
            resizeHeight: scaledHeight,
          });
          bitmaps.push(bitmap);
        }

        if (alive && bitmaps.length > 0) {
          framesReady = true;
          canvas.style.visibility = 'visible';
          if (videoEl) videoEl.style.display = 'none';
        }
        URL.revokeObjectURL(objectUrl);
      } catch {
        /* fall back to live video seeking */
      }
    };

    if (isMobile && videoEl) {
      // Autoplay looping background — reliable on touch devices.
      videoEl.loop = true;
      videoEl.autoplay = true;
      videoEl.style.display = 'block';
      if (canvas) canvas.style.visibility = 'hidden';

      const tryPlay = () => {
        videoEl.play().catch(() => {
          /* autoplay may be blocked until first gesture */
        });
      };
      videoEl.addEventListener('loadeddata', tryPlay);
      tryPlay();

      // Fallback: kick off playback on the first user interaction.
      const onFirstInteraction = () => {
        tryPlay();
        window.removeEventListener('touchstart', onFirstInteraction);
        window.removeEventListener('scroll', onFirstInteraction);
      };
      window.addEventListener('touchstart', onFirstInteraction, { passive: true });
      window.addEventListener('scroll', onFirstInteraction, { passive: true });

      cleanups.push(() => {
        videoEl.removeEventListener('loadeddata', tryPlay);
        window.removeEventListener('touchstart', onFirstInteraction);
        window.removeEventListener('scroll', onFirstInteraction);
      });
    } else {
      if (videoEl) {
        const onSeeked = () => {
          videoSeeking = false;
        };
        const onStalled = () => {
          videoSeeking = false;
        };
        const onLoadedData = () => {
          videoEl.currentTime = 0;
        };
        videoEl.addEventListener('seeked', onSeeked);
        videoEl.addEventListener('stalled', onStalled);
        videoEl.addEventListener('loadeddata', onLoadedData);
        cleanups.push(() => {
          videoEl.removeEventListener('seeked', onSeeked);
          videoEl.removeEventListener('stalled', onStalled);
          videoEl.removeEventListener('loadeddata', onLoadedData);
        });
      }

      if (canvas) canvas.style.visibility = 'hidden';
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      cleanups.push(() => window.removeEventListener('resize', resizeCanvas));
      rafIds.push(requestAnimationFrame(videoTick));
      void extractFrames();
    }

    // ===================== PARTICLES =====================
    const pCanvas = particlesCanvasRef.current;
    const pCtx = pCanvas?.getContext('2d') ?? null;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const createParticles = () => {
      if (!pCanvas) return;
      particles = [];
      const count = Math.floor((pCanvas.width * pCanvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * pCanvas.width,
          y: Math.random() * pCanvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
    };

    const resizeParticles = () => {
      if (!pCanvas) return;
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
      createParticles();
    };

    const animateParticles = () => {
      if (!alive || !pCanvas || !pCtx) return;
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = pCanvas.width;
        if (p.x > pCanvas.width) p.x = 0;
        if (p.y < 0) p.y = pCanvas.height;
        if (p.y > pCanvas.height) p.y = 0;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        pCtx.fill();
      }
      rafIds.push(requestAnimationFrame(animateParticles));
    };

    resizeParticles();
    window.addEventListener('resize', resizeParticles);
    cleanups.push(() => window.removeEventListener('resize', resizeParticles));
    rafIds.push(requestAnimationFrame(animateParticles));

    // ===================== HERO FADE =====================
    const updateHeroOpacity = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.3));
      hero.style.opacity = String(fade);
    };
    window.addEventListener('scroll', updateHeroOpacity, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', updateHeroOpacity));

    // ===================== FIXED CARDS =====================
    const tickCards = () => {
      if (!alive) return;
      const fixedCards = fixedCardsRef.current;
      const cardsGrid = cardsGridRef.current;
      const trigger = cardsTriggerRef.current;
      if (fixedCards && cardsGrid && trigger) {
        const rect = trigger.getBoundingClientRect();
        const triggerTop = rect.top + window.scrollY;
        const triggerHeight = rect.height;
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const start = triggerTop - vh * 0.5;
        const end = triggerTop + triggerHeight - vh * 0.3;
        const range = end - start;

        let progress = range > 0 ? (scrollY - start) / range : 0;
        progress = Math.max(0, Math.min(1, progress));

        const isActive = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3;
        const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)));
        const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)));
        const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0;

        fixedCards.style.opacity = String(containerOpacity);
        fixedCards.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none';

        const isMobile = window.innerWidth < 768;
        const revealPct = progress * 130;
        const mask = isMobile
          ? `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
          : `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;
        cardsGrid.style.maskImage = mask;
        cardsGrid.style.webkitMaskImage = mask;
      }
      rafIds.push(requestAnimationFrame(tickCards));
    };
    rafIds.push(requestAnimationFrame(tickCards));

    return () => {
      alive = false;
      rafIds.forEach((id) => cancelAnimationFrame(id));
      cleanups.forEach((fn) => fn());
      bitmaps.forEach((b) => b.close());
    };
  }, []);

  return (
    <>
      {/* Scroll-scrubbed video background */}
      <div
        className="fixed inset-0 bg-[#0a0a0a]"
        style={{ zIndex: -10, top: '-20%' }}
      >
        <canvas ref={videoCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
        <video
          ref={videoElRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Particles */}
      <canvas
        ref={particlesCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
      />

      {/* Fixed reveal cards */}
      <div
        ref={fixedCardsRef}
        className="fixed bottom-0 left-0 right-0 px-6 md:px-10 py-8 opacity-0 pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <div
          ref={cardsGridRef}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {cards.map((card) => (
            <div key={card.title}>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="relative z-10 flex-1 flex flex-col items-center justify-end
            text-center px-6 pb-24">
            <p className="text-white/50 text-sm tracking-[0.15em] uppercase mb-5">
              Gyan Bhambhani
            </p>
            <h1
              className="font-serif-display text-white leading-[1.12] max-w-3xl tracking-tight"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
            >
              I build AI products that{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-white rounded-[4px]" aria-hidden />
                <span className="relative text-black px-2">ship</span>
              </span>
              .
            </h1>

            <div className="flex items-center gap-3 mt-10 flex-col sm:flex-row justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white text-black font-medium
                  rounded-full px-7 py-3 text-sm hover:bg-white/90 active:scale-95
                  transition-all duration-150"
              >
                View work
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <a
                href="mailto:gyanb@berkeley.edu"
                className="liquid-glass rounded-full px-6 py-3 text-sm text-white/90
                  font-mono hover:bg-white/5 transition-colors duration-150"
              >
                gyanb@berkeley.edu
              </a>
            </div>
          </div>

          <div className="relative z-10 flex justify-center pb-8">
            <ChevronDown size={24} className="text-white/40 animate-bounce" strokeWidth={2} />
          </div>
        </section>

        {/* Spacer */}
        <div style={{ height: '150vh' }} />

        {/* Cards trigger zone */}
        <div ref={cardsTriggerRef} style={{ height: '200vh' }} />

        {/* Spacer */}
        <div style={{ height: '100vh' }} />

        {/* Finale */}
        <section className="relative min-h-screen flex items-end justify-center px-6 md:px-10
          pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-4">
              Get in touch
            </p>
            <a
              href="mailto:gyanb@berkeley.edu"
              className="font-serif-display text-white hover:text-white/80 transition-colors
                duration-150 tracking-tight"
              style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }}
            >
              gyanb@berkeley.edu
            </a>
          </motion.div>
        </section>
      </div>
    </>
  );
}
