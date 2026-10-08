'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number; // 0..1, higher = closer (more parallax, brighter)
  phase: number;
  speed: number;
  hue: number;
}

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
}

/**
 * Site-wide galaxy: nebula glow (CSS), parallax twinkling stars and shooting
 * stars (canvas). Fixed behind all content, pointer-events none.
 */
export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    const shooters: Shooter[] = [];
    let raf = 0;
    let alive = true;
    let nextShooter = performance.now() + 1800;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.floor((w * h) / 4200));
      stars = Array.from({ length: count }, () => {
        const depth = Math.pow(Math.random(), 2.2);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + depth * 1.5,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          hue: Math.random() < 0.18 ? 215 : Math.random() < 0.1 ? 28 : 0,
        };
      });
    };

    const spawnShooter = () => {
      const fromLeft = Math.random() < 0.5;
      const angle = (Math.PI / 180) * (18 + Math.random() * 22);
      const speed = 11 + Math.random() * 8;
      shooters.push({
        x: fromLeft ? Math.random() * w * 0.6 : w * (0.4 + Math.random() * 0.6),
        y: Math.random() * h * 0.45,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 55 + Math.random() * 30,
        len: 90 + Math.random() * 110,
      });
    };

    const frame = (now: number) => {
      if (!alive) return;
      ctx.clearRect(0, 0, w, h);

      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      const scrollOff = window.scrollY;

      for (const s of stars) {
        const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(now * 0.001 * s.speed + s.phase);
        const px = s.x - mx * 22 * s.depth;
        let py = (s.y - my * 22 * s.depth - scrollOff * 0.05 * s.depth) % h;
        if (py < 0) py += h;
        const a = (0.25 + s.depth * 0.75) * tw;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === 0 ? `rgba(255,255,255,${a})` : `hsla(${s.hue},90%,${s.hue === 28 ? 80 : 85}%,${a})`;
        ctx.fill();
        if (s.depth > 0.85) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190,205,255,${a * 0.12})`;
          ctx.fill();
        }
      }

      if (!reduced) {
        if (now > nextShooter && shooters.length < 3) {
          spawnShooter();
          nextShooter = now + 2200 + Math.random() * 4200;
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const s = shooters[i];
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          const t = s.life / s.max;
          const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
          const mag = Math.hypot(s.vx, s.vy);
          const tailX = s.x - (s.vx / mag) * s.len;
          const tailY = s.y - (s.vy / mag) * s.len;
          const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          g.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
          g.addColorStop(0.3, `rgba(170,190,255,${0.45 * fade})`);
          g.addColorStop(1, 'rgba(120,140,255,0)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.fill();
          if (s.life >= s.max || s.x < -200 || s.x > w + 200 || s.y > h + 200) shooters.splice(i, 1);
        }
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / w - 0.5;
      ty = e.clientY / h - 0.5;
    };
    const onResize = () => {
      build();
      if (reduced) frame(performance.now());
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(frame);
    };

    build();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
      <div className="nebula absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
