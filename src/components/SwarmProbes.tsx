'use client';

import { useEffect, useRef } from 'react';
import { bridge, type BridgeStar } from '@/lib/starBridge';

/**
 * A single star from the background sky breaks loose, flies to an element tagged
 * `data-swarm`, traces its outline (drawing the line as it goes), then drifts back
 * to its place in the sky. Elements tagged `.swarm-reveal` stay hidden until their
 * outline is complete, so the page is literally drawn into existence.
 * At most two stars are ever out at once.
 */

interface Mote {
  s: BridgeStar;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mode: 'out' | 'back';
  trail: { x: number; y: number }[];
}

interface Job {
  el: HTMLElement;
  mote: Mote;
  phase: 'travel' | 'draw' | 'hold';
  age: number;
  t: number;
}

interface Geom {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

const PAD = 10;
const TRAIL = 14;
const DRAW_MS = 900;
const COLOR = '#c9d4ff';
const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

// The hero fades out via an inline opacity on its <section>; ignore anything inside it once faded.
const faded = (el: HTMLElement) => {
  const o = parseFloat(el.closest('section')?.style.opacity || '1');
  return o < 0.35;
};

const starColor = (hue: number) =>
  hue === 0 ? '255,255,255' : hue === 215 ? '170,195,255' : '255,220,170';

const isDock = (el: HTMLElement) => el.dataset.swarm === 'dock';

const geomOf = (el: HTMLElement): Geom => {
  const b = el.getBoundingClientRect();
  const w = b.width + PAD * 2;
  const h = b.height + PAD * 2;
  const r = Math.min(Number(el.dataset.swarmRadius || 0), h / 2, w / 2);
  return { x: b.left - PAD, y: b.top - PAD, w, h, r };
};

/** Point on a rounded-rect perimeter, clockwise from the end of the top-left arc, p in 0..1. */
const pointAt = (g: Geom, p: number) => {
  const { x, y, w, h, r } = g;
  const top = w - 2 * r;
  const side = h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * top + 2 * side + 4 * arc;
  let d = Math.min(1, Math.max(0, p)) * total;

  const seg = (len: number) => {
    const inside = d <= len;
    if (!inside) d -= len;
    return inside;
  };
  const corner = (cx: number, cy: number, a0: number) => {
    const a = a0 + (d / (arc || 1)) * (Math.PI / 2);
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  };

  if (seg(top)) return { x: x + r + d, y };
  if (seg(arc)) return corner(x + w - r, y + r, -Math.PI / 2);
  if (seg(side)) return { x: x + w, y: y + r + d };
  if (seg(arc)) return corner(x + w - r, y + h - r, 0);
  if (seg(top)) return { x: x + w - r - d, y: y + h };
  if (seg(arc)) return corner(x + r, y + h - r, Math.PI / 2);
  if (seg(side)) return { x, y: y + h - r - d };
  return corner(x + r, y + r, Math.PI);
};

const perimeter = (g: Geom) =>
  2 * (g.w - 2 * g.r) + 2 * (g.h - 2 * g.r) + 2 * Math.PI * g.r;

export default function SwarmProbes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (reduced || !canvas || !ctx) return;

    let vw = 0;
    let vh = 0;
    let raf = 0;
    let last = performance.now();
    let lastAssign = 0;
    let lastQuery = 0;
    let targets: HTMLElement[] = [];
    const done = new WeakSet<HTMLElement>();
    const jobs: Job[] = [];
    const motes: Mote[] = [];

    // Safety net: if an element is on screen for a few seconds and the star never built it, show it.
    const observed = new WeakSet<Element>();
    const timers = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (el.classList.contains('swarm-built')) continue;
          if (e.isIntersecting) {
            if (!timers.has(el)) {
              // Followers (no outline of their own) wait for their section's title; if that title is
              // already built or not on screen, there's nothing to wait for.
              let wait = 10000;
              if (!el.hasAttribute('data-swarm')) {
                const title = el
                  .closest('section')
                  ?.querySelector<HTMLElement>('[data-swarm]:not([data-swarm="dock"])');
                const tr = title?.getBoundingClientRect();
                const titleOnScreen = !!tr && tr.bottom > 0 && tr.top < window.innerHeight;
                if (!title || title.classList.contains('swarm-built') || !titleOnScreen) wait = 500;
              }
              timers.set(
                el,
                window.setTimeout(() => {
                  timers.delete(el);
                  el.classList.add('swarm-built');
                }, wait),
              );
            }
          } else if (timers.has(el)) {
            window.clearTimeout(timers.get(el));
            timers.delete(el);
          }
        }
      },
      { threshold: 0.15 },
    );
    const watchReveals = () => {
      document.querySelectorAll('.swarm-reveal').forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    };

    /** Reveal the non-title content of a section (staggered) once its title has been drawn. */
    const revealFollowers = (title: HTMLElement) => {
      const section = title.closest('section');
      if (!section) return;
      const followers = Array.from(
        section.querySelectorAll<HTMLElement>('.swarm-reveal:not([data-swarm]):not(.swarm-built)'),
      ).filter((f) => !f.contains(title) && !title.contains(f));
      followers.forEach((f, i) => {
        f.style.animationDelay = `${i * 110}ms`;
        f.classList.add('swarm-built');
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const endJob = (job: Job, finished: boolean) => {
      job.mote.mode = 'back';
      if (finished) done.add(job.el);
      const i = jobs.indexOf(job);
      if (i >= 0) jobs.splice(i, 1);
    };

    const maybeAssign = (now: number) => {
      if (now - lastQuery > 1200) {
        targets = Array.from(document.querySelectorAll<HTMLElement>('[data-swarm]'));
        watchReveals();
        lastQuery = now;
      }
      if (now - lastAssign < 300 || jobs.length >= 2) return;

      const busy = new Set(jobs.map((j) => j.el));
      let best: HTMLElement | null = null;
      let bestScore = Infinity;
      for (const el of targets) {
        if (done.has(el) || busy.has(el) || faded(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 40 || r.height < 10) continue;
        let score: number;
        if (isDock(el)) {
          score = 1e6; // built after everything else currently on screen, same treatment
        } else {
          if (r.top > vh * 0.82 || r.bottom < vh * 0.12) continue;
          score = Math.abs(r.top + Math.min(r.height, 200) / 2 - vh * 0.45);
        }
        if (score < bestScore) {
          bestScore = score;
          best = el;
        }
      }
      if (!best) return;

      // borrow the nearest bright star to where the outline starts
      const start = pointAt(geomOf(best), 0);
      let star: BridgeStar | null = null;
      let bd = Infinity;
      for (const s of bridge.stars) {
        if (s.away || s.depth < 0.2 || s.cx < 0 || s.cx > vw || s.cy < 0 || s.cy > vh) continue;
        const d = Math.hypot(s.cx - start.x, s.cy - start.y);
        if (d < bd) {
          bd = d;
          star = s;
        }
      }
      if (!star) return;

      star.away = true;
      const mote: Mote = { s: star, x: star.cx, y: star.cy, vx: 0, vy: 0, mode: 'out', trail: [] };
      motes.push(mote);
      jobs.push({ el: best, mote, phase: 'travel', age: 0, t: 0 });
      lastAssign = now;
    };

    const holdMs = () => 600;

    const step = (dt: number, now: number) => {
      const k = dt / 16.67;

      for (const job of [...jobs]) {
        const b = job.el.getBoundingClientRect();
        const offscreen = !isDock(job.el) && (b.bottom < -40 || b.top > vh + 40);
        if (offscreen || faded(job.el)) {
          endJob(job, false);
          continue;
        }
        job.age += dt;
        const g = geomOf(job.el);
        if (job.phase === 'travel') {
          const s0 = pointAt(g, 0);
          if (Math.hypot(job.mote.x - s0.x, job.mote.y - s0.y) < 24 || job.age > 2600) {
            job.phase = 'draw';
            job.t = 0;
          }
        } else if (job.phase === 'draw') {
          job.t += dt;
          if (job.t >= DRAW_MS) {
            job.phase = 'hold';
            job.t = 0;
            job.el.classList.add('swarm-built');
            revealFollowers(job.el);
          }
        } else {
          job.t += dt;
          if (job.t > holdMs()) endJob(job, true);
        }
      }

      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        const job = m.mode === 'out' ? jobs.find((j) => j.mote === m) : undefined;

        // while drawing, the star rides the outline exactly
        if (job && job.phase === 'draw') {
          const p = pointAt(geomOf(job.el), ease(job.t / DRAW_MS));
          m.vx = p.x - m.x;
          m.vy = p.y - m.y;
          m.x = p.x;
          m.y = p.y;
          m.trail.push({ x: m.x, y: m.y });
          if (m.trail.length > TRAIL) m.trail.shift();
          continue;
        }

        let tx: number;
        let ty: number;
        if (job) {
          const s0 = pointAt(geomOf(job.el), 0);
          tx = s0.x;
          ty = s0.y;
        } else {
          tx = m.s.cx;
          ty = m.s.cy;
        }
        const maxSpeed = m.mode === 'out' ? 13 : 8;
        const dx = tx - m.x;
        const dy = ty - m.y;
        const d = Math.hypot(dx, dy) || 1;

        if (m.mode === 'back' && d < 5) {
          m.s.away = false;
          motes.splice(i, 1);
          continue;
        }

        const sp = maxSpeed * Math.min(1, d / 120);
        m.vx += ((dx / d) * sp - m.vx) * 0.09 * k;
        m.vy += ((dy / d) * sp - m.vy) * 0.09 * k;
        m.x += m.vx * k;
        m.y += m.vy * k;
        m.trail.push({ x: m.x, y: m.y });
        if (m.trail.length > TRAIL) m.trail.shift();
      }

      maybeAssign(now);
    };

    const draw = () => {
      ctx.clearRect(0, 0, vw, vh);

      for (const job of jobs) {
        if (job.phase === 'travel') continue;
        const g = geomOf(job.el);
        const drawing = job.phase === 'draw';
        const p = drawing ? ease(job.t / DRAW_MS) : 1;
        const hold = holdMs();
        const fade = drawing ? 1 : 1 - Math.max(0, (job.t - (hold - 300)) / 300);
        const L = perimeter(g);

        ctx.globalAlpha = fade;
        ctx.beginPath();
        ctx.roundRect(g.x + 0.5, g.y + 0.5, g.w, g.h, g.r);
        if (!drawing) {
          ctx.fillStyle = 'rgba(201,212,255,0.05)';
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(201,212,255,${drawing ? 0.85 : 0.55})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([L * p, L * 2]);
        ctx.stroke();
        ctx.setLineDash([]);

        if (!drawing && g.r === 0) {
          const { x, y, w, h } = g;
          const c = 9;
          ctx.strokeStyle = COLOR;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x, y + c); ctx.lineTo(x, y); ctx.lineTo(x + c, y);
          ctx.moveTo(x + w - c, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + c);
          ctx.moveTo(x + w, y + h - c); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - c, y + h);
          ctx.moveTo(x + c, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h - c);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      for (const m of motes) {
        const rgb = starColor(m.s.hue);
        const t = m.trail;
        ctx.lineCap = 'round';
        for (let i = 1; i < t.length; i++) {
          const f = i / t.length;
          ctx.strokeStyle = `rgba(${rgb},${f * 0.6})`;
          ctx.lineWidth = 0.5 + f * 1.8;
          ctx.beginPath();
          ctx.moveTo(t[i - 1].x, t[i - 1].y);
          ctx.lineTo(t[i].x, t[i].y);
          ctx.stroke();
        }
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 12);
        g.addColorStop(0, `rgba(${rgb},0.75)`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.s.r + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      step(dt, now);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      motes.forEach((m) => (m.s.away = false));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}
