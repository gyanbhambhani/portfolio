import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Footer from '@/components/Footer';
import GlowCard from '@/components/GlowCard';
import { Reveal, RevealLine } from '@/components/Motion';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-6 pt-40 pb-24">

        <Reveal>
          <header className="mb-16">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Index</p>
            <h1 className="font-serif-display text-5xl md:text-7xl text-white tracking-tight mb-5">
              Projects
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
              Things I&apos;ve built. Some worked, some didn&apos;t. All taught me something.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <RevealLine key={project.slug} index={i} className="h-full">
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full active:scale-[0.99] transition-transform
                  duration-150"
              >
                <GlowCard borderRadius={24} className="h-full">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-white/30 text-xs tabular-nums tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white/30 text-xs tabular-nums">{project.year}</span>
                    </div>

                    <h2 className="font-serif-display text-2xl md:text-3xl text-white
                      mb-3 tracking-tight leading-tight">
                      {project.title}
                    </h2>

                    <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                      {project.tagline}
                    </p>

                    <div className="flex items-end justify-between gap-4">
                      <p className="text-white/35 text-[10px] uppercase tracking-[0.12em]
                        leading-relaxed">
                        {project.tech.slice(0, 3).join(' · ')}
                      </p>
                      <span className="liquid-glass rounded-full p-2 text-white/70
                        group-hover:text-white transition-colors duration-150">
                        <ArrowUpRight size={16} strokeWidth={1.75} />
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </RevealLine>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
