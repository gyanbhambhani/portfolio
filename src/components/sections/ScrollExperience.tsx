'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import HomeSections from './HomeSections';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4';

const stats = [
  { value: '1.5M+', label: 'podcast views' },
  { value: '2,000+', label: 'students on StudyBase' },
  { value: '~$500k', label: 'raised by founders on Entrelink' },
  { value: 'a16z', label: 'Speedrun 005' },
];

export default function ScrollExperience() {
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

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
    const ctx = canvas?.getContext('2d', { alpha: false, desynchronized: true }) ?? null;
    let framesReady = false;
    let plannedFrameCount = 180;
    let lastFrameIndex = -1;
    let videoSeeking = false;
    let pendingSeekTarget = -1;
    let paintScheduled = false;

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

    const paintVideo = () => {
      if (!alive) return;
      const progress = getProgress();
      if (bitmaps.length > 0) {
        const span = Math.max(1, (framesReady ? bitmaps.length : plannedFrameCount) - 1);
        const idx = Math.round(progress * span);
        const frame = bitmaps[idx];
        if (frame) {
          if (idx !== lastFrameIndex) {
            lastFrameIndex = idx;
            drawFrame(frame);
          }
          if (canvas) canvas.style.visibility = 'visible';
          if (videoEl) videoEl.style.display = 'none';
          return;
        }
      }
      if (!framesReady && videoEl && videoEl.style.display === 'none') {
        videoEl.style.display = 'block';
        if (canvas) canvas.style.visibility = 'hidden';
      }
      if (
        !videoEl ||
        !videoEl.duration ||
        !isFinite(videoEl.duration) ||
        videoEl.readyState < 1 ||
        videoSeeking
      ) {
        return;
      }
      const target = progress * videoEl.duration;
      // One seek per scroll position. Repeating a finished seek hitches scroll.
      if (Math.abs(target - pendingSeekTarget) < 1 / 24) return;
      pendingSeekTarget = target;
      videoSeeking = true;
      videoEl.currentTime = target;
    };

    const schedulePaint = () => {
      if (paintScheduled) return;
      paintScheduled = true;
      rafIds.push(
        requestAnimationFrame(() => {
          paintScheduled = false;
          paintVideo();
        }),
      );
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

        const scale = Math.min(1, 1024 / video.videoWidth);
        const scaledWidth = Math.round(video.videoWidth * scale);
        const scaledHeight = Math.round(video.videoHeight * scale);
        // Native clip is 24fps. A 120-frame cap only kept ~12fps across this
        // scroll, so the lotus stepped. 30fps with a higher cap tracks scroll.
        plannedFrameCount = Math.max(48, Math.min(200, Math.round(video.duration * 30)));
        const frameCount = plannedFrameCount;

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
          schedulePaint();
        }

        if (alive && bitmaps.length > 0) {
          framesReady = true;
          lastFrameIndex = -1;
          canvas.style.visibility = 'visible';
          if (videoEl) videoEl.style.display = 'none';
          schedulePaint();
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
          schedulePaint();
        };
        const onStalled = () => {
          videoSeeking = false;
          pendingSeekTarget = -1;
          schedulePaint();
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
      const onResize = () => {
        resizeCanvas();
        schedulePaint();
      };
      window.addEventListener('resize', onResize);
      window.addEventListener('scroll', schedulePaint, { passive: true });
      cleanups.push(() => window.removeEventListener('resize', onResize));
      cleanups.push(() => window.removeEventListener('scroll', schedulePaint));
      schedulePaint();
      void extractFrames();
    }

    // ===================== HERO FADE =====================
    const updateHeroOpacity = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.3));
      hero.style.opacity = String(fade);
    };
    window.addEventListener('scroll', updateHeroOpacity, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', updateHeroOpacity));

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

      {/* Scrolling content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero */}
        <section ref={heroRef} className="relative h-screen min-h-[640px] w-full flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="relative z-10 flex-1 flex flex-col items-center justify-end
            text-center px-6 pb-28">
            <h1
              className="hero-in font-serif-display text-white leading-[1.08] max-w-4xl tracking-tight"
              style={{ animationDelay: '0.2s', fontSize: 'clamp(2.25rem, 7vw, 5.25rem)' }}
            >
              I build AI products that{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-white rounded-[4px]" aria-hidden />
                <span className="relative text-black px-2">ship</span>
              </span>
              .
            </h1>
            <p
              style={{ animationDelay: '0.4s' }}
              className="hero-in text-white/70 text-base md:text-lg max-w-xl mt-5 leading-relaxed"
            >
              Founding engineer at an a16z-backed startup, studying at Haas. I take things from
              first interview to real users, and real revenue.
            </p>

            <div
              style={{ animationDelay: '0.55s' }}
              className="hero-in flex items-center gap-3 mt-8 flex-col sm:flex-row justify-center"
            >
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

            <dl
              style={{ animationDelay: '0.8s' }}
              className="hero-in hidden md:grid grid-cols-4 gap-10 mt-12 pt-6 border-t border-white/15 w-full max-w-3xl"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <dt className="font-serif-display text-white text-3xl tracking-tight">{s.value}</dt>
                  <dd className="text-white/45 text-[11px] uppercase tracking-[0.15em] mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

        </section>

        <HomeSections />
      </div>
    </>
  );
}
