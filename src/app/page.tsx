'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_ITEMS = ['Projects', 'Work', 'Research', 'About', 'Writing'];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Home() {
  const recentProjects = projects.slice(0, 4);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-ink relative overflow-hidden">

      {/* Mouse-following ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px,
            rgba(196, 129, 59, 0.07), transparent 55%)`,
        }}
      />

      {/* Static top-right warmth */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[500px] h-[400px] z-0"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(196,129,59,0.05), transparent 65%)',
        }}
      />

      {/* Static bottom-left warmth */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[400px] h-[300px] z-0"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(196,129,59,0.03), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-between items-center mb-24"
        >
          <span className="font-mono text-[15px] text-ash/60 uppercase tracking-[0.22em]">
            Berkeley · 2027
          </span>
          <nav className="flex items-center gap-7">
            {NAV_ITEMS.map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="font-mono text-[15px] text-ash hover:text-bone uppercase
                  tracking-[0.15em] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            <span className="text-edge/60 select-none font-mono text-[10px]">|</span>
            <ThemeToggle />
          </nav>
        </motion.div>

        {/* Hero */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display font-bold text-bone leading-[0.88] tracking-[-0.01em]
              mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
          >
            Gyan<br />Bhambhani
          </motion.h1>

          {/* Amber line that draws in from left */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.5, ease }}
            style={{ transformOrigin: 'left' }}
            className="h-px bg-gradient-to-r from-amber/70 via-amber/25 to-transparent mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="font-body italic text-xl text-ash/80 max-w-md leading-relaxed mb-3"
          >
            Builder. Berkeley student focused on AI and venture.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="font-mono text-[10px] text-ash/40 uppercase tracking-[0.18em]"
          >
            Currently: Founding Engineer, EverCurrent · a16z Speedrun
          </motion.p>
        </div>

        {/* Recent work */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          <p className="label-amber mb-8">Recent work</p>

          <div>
            {recentProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.65 + i * 0.08, ease }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative flex items-baseline gap-8 py-5
                    border-b border-edge cursor-pointer"
                >
                  {/* Amber left indicator bar */}
                  <span
                    className="absolute left-0 inset-y-0 w-[2px] bg-amber
                      origin-top scale-y-0 group-hover:scale-y-100
                      transition-transform duration-200 ease-out"
                  />

                  <span className="font-mono text-[10px] text-ash/30 shrink-0 w-5 pl-0
                    group-hover:text-amber/60 transition-colors duration-200">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className="font-display font-semibold text-bone
                      group-hover:text-amber transition-colors duration-200 mr-3">
                      {project.title}
                    </span>
                    <span className="font-body text-[15px] text-ash/70">
                      {project.tagline}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-ash/30 shrink-0
                    group-hover:text-ash/60 transition-colors duration-200">
                    {project.year}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="mt-7"
          >
            <Link
              href="/projects"
              className="font-mono text-[11px] text-ash/50 hover:text-amber uppercase
                tracking-[0.15em] transition-colors duration-200"
            >
              All projects →
            </Link>
          </motion.div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-edge"
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:gyanb@berkeley.edu"
              className="font-mono text-[11px] text-ash/50 hover:text-amber uppercase
                tracking-[0.12em] transition-colors duration-200"
            >
              gyanb@berkeley.edu
            </a>
            <a
              href="https://linkedin.com/in/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ash/50 hover:text-amber uppercase
                tracking-[0.12em] transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
