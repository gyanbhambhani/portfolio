'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '1.5M+',  label: 'Podcast Views'        },
  { value: '~$500k', label: 'Raised via Entrelink'  },
  { value: '2,000+', label: 'Students on StudyBase' },
  { value: 'a16z',   label: 'Speedrun 005'          },
];

export default function Home() {
  const recentProjects = projects.slice(0, 4);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <main className="min-h-screen bg-ink relative overflow-hidden">

      {/* Mouse-following ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px,
            rgba(196, 129, 59, 0.06), transparent 55%)`,
        }}
      />

      {/* Static top-right warmth */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[500px] h-[400px] z-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(196,129,59,0.05), transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.05, ease }}
            className="font-display font-bold text-bone leading-[0.9] tracking-[-0.01em] mb-5"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 6.5rem)' }}
          >
            Gyan<br />Bhambhani
          </motion.h1>

          {/* Amber line drawing in */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.28, delay: 0.18, ease }}
            style={{ transformOrigin: 'left' }}
            className="h-px bg-gradient-to-r from-amber/70 via-amber/25 to-transparent mb-5"
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.22, ease }}
            className="font-body italic text-xl text-ash/80 max-w-md leading-relaxed mb-2"
          >
            Builder. Berkeley student focused on AI and venture.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, delay: 0.28, ease }}
            className="font-mono text-[10px] text-ash/40 uppercase tracking-[0.18em] mb-8"
          >
            Currently: Founding Engineer, EverCurrent · a16z Speedrun
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, delay: 0.32, ease }}
            className="flex flex-wrap gap-x-8 gap-y-2"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span
                  className="font-display font-bold text-amber text-sm"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {value}
                </span>
                <span className="font-mono text-[9px] text-ash/40 uppercase tracking-[0.12em]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Recent work ──────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.36, ease }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <p className="label-amber">Recent work</p>
            <Link
              href="/projects"
              className="font-mono text-[10px] text-ash/40 hover:text-amber uppercase
                tracking-[0.15em] transition-colors duration-150"
            >
              All projects →
            </Link>
          </div>

          <div>
            {recentProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: 0.38 + i * 0.04, ease }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative flex items-baseline gap-8 py-5
                    border-b border-edge cursor-pointer active:opacity-70
                    transition-opacity duration-100"
                >
                  {/* Active-state indicator bar */}
                  <span
                    className="absolute left-0 inset-y-0 w-[2px] bg-amber
                      origin-top scale-y-0 group-hover:scale-y-100
                      transition-transform duration-150 ease-out"
                  />

                  <span className="font-mono text-[10px] text-ash/30 shrink-0 w-5
                    group-hover:text-amber/60 transition-colors duration-150"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className="font-display font-semibold text-bone
                      group-hover:text-amber transition-colors duration-150 mr-3">
                      {project.title}
                    </span>
                    <span className="font-body text-[15px] text-ash/70">
                      {project.tagline}
                    </span>
                  </div>

                  <span
                    className="font-mono text-[10px] text-ash/30 shrink-0
                      group-hover:text-ash/60 transition-colors duration-150"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {project.year}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.54, duration: 0.22 }}
          className="mt-20 pt-8 border-t border-edge"
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:gyanb@berkeley.edu"
              className="link-line font-mono text-[11px] text-ash/50 uppercase
                tracking-[0.12em]"
            >
              gyanb@berkeley.edu
            </a>
            <a
              href="https://linkedin.com/in/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-mono text-[11px] text-ash/50 uppercase
                tracking-[0.12em]"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
