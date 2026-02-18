'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';


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
      {/* Ambient mouse glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px,
            rgba(196, 129, 59, 0.07), transparent 55%)`,
        }}
      />

      {/* Static corner warmth */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] z-0"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(196,129,59,0.04), transparent 60%)',
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
          <span className="font-mono text-[10px] text-ash uppercase tracking-[0.2em]">
            Berkeley · 2027
          </span>
          <nav className="flex gap-7">
            {NAV_ITEMS.map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="font-mono text-[10px] text-ash hover:text-bone uppercase
                  tracking-[0.15em] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Hero name */}
        <div className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display font-bold text-bone leading-[0.88] tracking-tight
              mb-8"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
          >
            Gyan<br />Bhambhani
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="font-body italic text-lg text-ash max-w-sm leading-relaxed"
          >
            Builder. Berkeley student focused on AI and venture.
          </motion.p>
        </div>

        {/* Recent work */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease }}
        >
          <p className="label-amber mb-6">Recent work</p>

          <div>
            {recentProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.08, ease }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-baseline gap-4 py-5 border-b border-edge
                    hover:border-ash/40 transition-colors"
                >
                  <span className="font-mono text-[10px] text-ash/40 shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-display font-medium text-bone
                      group-hover:text-amber transition-colors duration-200 mr-3">
                      {project.title}
                    </span>
                    <span className="font-body text-ash text-[15px]">
                      {project.tagline}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-ash/40 shrink-0">
                    {project.year}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-6"
          >
            <Link
              href="/projects"
              className="font-mono text-[11px] text-ash hover:text-amber uppercase
                tracking-[0.15em] transition-colors"
            >
              All projects →
            </Link>
          </motion.div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-edge"
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:gyanb@berkeley.edu"
              className="font-mono text-[11px] text-ash hover:text-amber uppercase
                tracking-[0.12em] transition-colors"
            >
              gyanb@berkeley.edu
            </a>
            <a
              href="https://linkedin.com/in/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ash hover:text-amber uppercase
                tracking-[0.12em] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
