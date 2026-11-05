'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { projects, workExperiences } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease },
};

const rows = ['evercurrent', 'rltr', 'entrelink', 'studybase', 'tickeriq', 'podcast']
  .map((slug) => projects.find((p) => p.slug === slug)!)
  .filter(Boolean);

const displayName: Record<string, string> = { podcast: 'Entrepreneurship Insights' };
const pad = (n: number) => String(n).padStart(2, '0');

/** Big serif rows. Hovering one dims the rest and shows its detail in the side panel. */
function ProjectList() {
  const [active, setActive] = useState(rows[0].slug);
  const current = rows.find((p) => p.slug === active) ?? rows[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-16">
      <ul className="group/list border-t border-white/15">
        {rows.map((p, i) => (
          <li key={p.slug} className="swarm-reveal border-b border-white/15">
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className="group/row flex items-baseline gap-4 md:gap-6 py-5 md:py-6 transition-opacity
                duration-300 group-hover/list:opacity-30 hover:!opacity-100 focus-visible:!opacity-100"
            >
              <span className="w-7 shrink-0 text-white/35 text-xs tabular-nums">{pad(i + 1)}</span>
              <span
                className="flex-1 font-serif-display text-white tracking-tight leading-none
                  transition-transform duration-300 group-hover/row:translate-x-2"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
              >
                {displayName[p.slug] ?? p.title}
              </span>
              {p.metric && (
                <span className="lg:hidden text-white/50 text-xs tabular-nums whitespace-nowrap">
                  {p.metric.value}
                </span>
              )}
              <span className="hidden sm:block text-white/40 text-xs tabular-nums">{p.year}</span>
              <ArrowUpRight
                size={18}
                strokeWidth={1.75}
                className="text-white/40 transition-all duration-300 group-hover/row:text-white
                  group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 shrink-0 self-center"
              />
            </Link>
          </li>
        ))}
      </ul>

      <aside className="hidden lg:block">
        <div key={current.slug} className="sticky top-32 pt-8 animate-fade-in">
          {current.metric && (
            <>
              <p
                className="font-serif-display text-white tracking-tight leading-none mb-3"
                style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
              >
                {current.metric.value}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-[0.15em] mb-8">
                {current.metric.label}
              </p>
            </>
          )}
          <p className="text-white/75 text-base leading-relaxed mb-6">{current.description}</p>
          <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] leading-relaxed">
            {current.tech.join(' · ')}
          </p>
        </div>
      </aside>
    </div>
  );
}

function SectionHead({ index, title, href, cta }: { index: string; title: string; href?: string; cta?: string }) {
  return (
    <motion.div {...fade} className="flex items-end justify-between gap-6 mb-10 md:mb-14">
      <div>
        <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4 tabular-nums">{index}</p>
        <h2
          data-swarm="heading"
          className="swarm-reveal font-serif-display text-white tracking-tight leading-[1.05]"
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

        <ProjectList />

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

        <ul className="group/list border-t border-white/15">
          {workExperiences.map((w) => (
            <li key={w.company} className="swarm-reveal border-b border-white/15">
              <div
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 md:gap-10 py-8 transition-opacity
                  duration-300 group-hover/list:opacity-30 hover:!opacity-100"
              >
                <div>
                  <h3
                    className="font-serif-display text-white tracking-tight leading-none"
                    style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)' }}
                  >
                    {w.company}
                  </h3>
                  <p className="text-white/50 text-xs uppercase tracking-[0.15em] mt-3">{w.role}</p>
                </div>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
                  {w.highlights[0]}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-[0.12em] md:text-right md:pt-2 whitespace-nowrap">
                  {w.period}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ─────────── About ─────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div
          className="border-t border-white/15 pt-10 md:pt-14
            grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16"
        >
          <div>
            <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-5 tabular-nums">03 / About</p>
            <h2
              data-swarm="heading"
              className="swarm-reveal font-serif-display text-white tracking-tight leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
            >
              Hey, I&apos;m Gyan.
            </h2>
            <div className="swarm-reveal text-white/70 text-base leading-relaxed mb-8 max-w-xl space-y-4">
              <p>
                I&apos;m studying business and data science at Berkeley. I started making things in high school with a
                podcast that ended up at 1.5M views, and I haven&apos;t really stopped since.
              </p>
              <p>
                Right now I&apos;m a founding engineer at EverCurrent, building AI for hardware teams. I&apos;m also
                working on a tool for real estate agents, since I&apos;m a licensed one myself.
              </p>
            </div>
            <Link
              href="/about"
              className="swarm-reveal inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white
                transition-colors duration-150"
            >
              More about me <ArrowUpRight size={16} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="swarm-reveal self-end">
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">Outside of work</p>
            <ul className="space-y-2 text-sm text-white/70 leading-relaxed">
              <li>I play six instruments</li>
              <li>I train MMA</li>
              <li>I do card magic</li>
              <li>I like cars</li>
              <li>I speak Hindi and some French</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────── Contact ─────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-[10vh] pb-32 md:pb-36 text-center flex flex-col items-center">
        <motion.div {...fade} className="flex flex-col items-center">
          <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-5">Let&apos;s talk</p>
          <a
            href="mailto:gyanb@berkeley.edu"
            data-swarm="contact"
            className="swarm-reveal font-serif-display text-white hover:text-white/75 transition-colors duration-150
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
