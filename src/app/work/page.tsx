import Footer from '@/components/Footer';
import GlowCard from '@/components/GlowCard';
import { Reveal, RevealLine } from '@/components/Motion';
import { workExperiences } from '@/lib/data';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">

        <Reveal>
          <header className="mb-16">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Experience</p>
            <h1 className="font-serif-display text-5xl md:text-7xl text-white tracking-tight mb-5">
              Work
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
              What I&apos;ve been doing. Focus on the work, not the titles.
            </p>
          </header>
        </Reveal>

        <div className="space-y-6">
          {workExperiences.map((work, i) => (
            <RevealLine key={i} index={i}>
              <GlowCard borderRadius={24}>
                <article className="p-8 md:p-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between
                    sm:items-baseline gap-1 mb-2">
                    <h2 className="font-serif-display text-2xl md:text-3xl text-white
                      tracking-tight">
                      {work.company}
                    </h2>
                    <span className="text-white/40 text-xs uppercase tracking-[0.12em]">
                      {work.period}
                    </span>
                  </div>

                  <p className="text-white/60 text-xs uppercase tracking-[0.15em] mb-6">
                    {work.role}
                  </p>

                  <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                    {work.description}
                  </p>

                  <ul className="space-y-3">
                    {work.highlights.map((highlight, j) => (
                      <li
                        key={j}
                        className="text-white/50 text-sm flex gap-4 leading-relaxed"
                      >
                        <span className="text-white/30 mt-1 shrink-0 select-none">—</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              </GlowCard>
            </RevealLine>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
