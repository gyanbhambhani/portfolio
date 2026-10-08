'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { projects, workExperiences, about } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease },
};

const featured = ['evercurrent', 'rltr', 'entrelink', 'studybase']
  .map((slug) => projects.find((p) => p.slug === slug)!)
  .filter(Boolean);

function SectionHead({ index, title, href, cta }: { index: string; title: string; href?: string; cta?: string }) {
  return (
    <motion.div {...fade} className="flex items-end justify-between gap-6 mb-10 md:mb-14">
      <div>
        <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4 tabular-nums">{index}</p>
        <h2
          className="font-serif-display text-white tracking-tight leading-[1.05]"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
        >
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/70
            hover:text-white transition-colors duration-150 shrink-0 pb-2"
        >
          {cta}
          <ArrowUpRight size={16} strokeWidth={1.75} />
        </Link>
      )}
    </motion.div>
  );
}

export default function HomeSections() {
  return (
    <div className="relative">
      {/* Soft scrim so text stays legible over the bright video */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/55 to-black/80"
      />

      {/* ─────────── Selected work ─────────── */}
      <section id="work" className="max-w-6xl mx-auto px-6 md:px-10 pt-[24vh] pb-24 md:pb-32">
        <SectionHead index="01 / Selected work" title="Things that shipped." href="/projects" cta="All projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              {...fade}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.08 }}
              className="h-full"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group liquid-glass block h-full rounded-3xl bg-black/40 backdrop-blur-xl
                  p-7 md:p-9 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1
                  active:scale-[0.99]"
              >
                <div className="flex items-start justify-between mb-10 md:mb-14">
                  <span className="text-white/40 text-xs tabular-nums tracking-widest">
                    {String(i + 1).padStart(2, '0')} · {project.year}
                  </span>
                  <span className="liquid-glass rounded-full p-2 text-white/70 group-hover:text-white
                    group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                </div>

                {project.metric && (
                  <p
                    className="font-serif-display text-white tracking-tight leading-none mb-2"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
                  >
                    {project.metric.value}
                  </p>
                )}
                {project.metric && (
                  <p className="text-white/50 text-xs uppercase tracking-[0.15em] mb-8">
                    {project.metric.label}
                  </p>
                )}

                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] leading-relaxed">
                  {project.tech.slice(0, 4).join(' · ')}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/projects"
          className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm text-white/80"
        >
          All projects <ArrowUpRight size={16} strokeWidth={1.75} />
        </Link>
      </section>

      {/* ─────────── Experience ─────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <SectionHead index="02 / Now" title="Where I'm building." href="/work" cta="Full experience" />

        <div className="border-t border-white/15">
          {workExperiences.map((w, i) => (
            <motion.div
              key={w.company}
              {...fade}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 md:gap-10 py-8
                border-b border-white/15 group"
            >
              <div>
                <h3 className="font-serif-display text-white text-2xl md:text-3xl tracking-tight">
                  {w.company}
                </h3>
                <p className="text-white/50 text-xs uppercase tracking-[0.15em] mt-2">{w.role}</p>
              </div>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
                {w.highlights[0]}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-[0.12em] md:text-right md:pt-2 whitespace-nowrap">
                {w.period}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────── About ─────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <motion.div
          {...fade}
          className="liquid-glass rounded-[2rem] bg-black/40 backdrop-blur-xl p-8 md:p-14
            grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16"
        >
          <div>
            <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-5 tabular-nums">03 / About</p>
            <h2
              className="font-serif-display text-white tracking-tight leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
            >
              I don&apos;t wait for permission. When something should exist, I build it.
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8 max-w-xl">
              Berkeley Haas + Data Science, class of {about.education.graduation}. Started a podcast in high school
              that hit 1.5M views, became the youngest realtor in the Bay Area, and now build AI tools for hardware
              teams and agents.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white
                transition-colors duration-150"
            >
              More about me <ArrowUpRight size={16} strokeWidth={1.75} />
            </Link>
          </div>

          <ul className="space-y-4 self-end">
            {about.interests.map((interest, i) => (
              <li key={i} className="flex gap-4 items-baseline text-sm text-white/70 leading-relaxed">
                <span className="text-white/35 text-xs tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {interest}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ─────────── Contact ─────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-[10vh] pb-32 md:pb-36 text-center flex flex-col items-center">
        <motion.div {...fade} className="flex flex-col items-center">
          <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-5">Let&apos;s talk</p>
          <a
            href="mailto:gyanb@berkeley.edu"
            className="font-serif-display text-white hover:text-white/75 transition-colors duration-150
              tracking-tight break-all"
            style={{ fontSize: 'clamp(1.9rem, 7vw, 4.75rem)' }}
          >
            gyanb@berkeley.edu
          </a>
          <div className="flex items-center gap-3 mt-10">
            {[
              { href: 'mailto:gyanb@berkeley.edu', label: 'Email', Icon: Mail },
              { href: 'https://linkedin.com/in/gyanbhambhani', label: 'LinkedIn', Icon: Linkedin },
              { href: 'https://github.com/gyanbhambhani', label: 'GitHub', Icon: Github },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5
                  transition-all duration-150 active:scale-95"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </motion.div>

        <p className="mt-20 text-[11px] uppercase tracking-[0.2em] text-white/30">
          © 2026 Gyan Bhambhani · Berkeley · AI · Venture
        </p>
      </section>
    </div>
  );
}
