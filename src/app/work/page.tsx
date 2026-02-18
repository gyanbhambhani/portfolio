import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Reveal, RevealLine } from '@/components/Motion';
import { workExperiences } from '@/lib/data';

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">

          <Reveal>
            <header className="mb-16">
              <p className="label-amber mb-4">Experience</p>
              <h1 className="font-display text-5xl font-bold text-bone mb-4 leading-tight">
                Work
              </h1>
              <p className="font-body italic text-lg text-ash">
                What I&apos;ve been doing. Focus on the work, not the titles.
              </p>
            </header>
          </Reveal>

          <div className="space-y-0 border-t border-edge">
            {workExperiences.map((work, i) => (
              <RevealLine key={i} index={i}>
                <article className="py-10 border-b border-edge last:border-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between
                    sm:items-baseline gap-1 mb-3">
                    <h2 className="font-display text-2xl font-semibold text-bone">
                      {work.company}
                    </h2>
                    <span className="font-mono text-[10px] text-ash/50 uppercase
                      tracking-[0.12em]">
                      {work.period}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] text-amber uppercase tracking-[0.15em]
                    mb-5">
                    {work.role}
                  </p>

                  <p className="font-body text-[17px] text-ash leading-[1.75] mb-6">
                    {work.description}
                  </p>

                  <ul className="space-y-2.5">
                    {work.highlights.map((highlight, j) => (
                      <li key={j} className="font-body text-[15px] text-ash/70
                        flex gap-4 leading-relaxed">
                        <span className="text-edge mt-1 shrink-0">—</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealLine>
            ))}
          </div>

        </div>
        <Footer />
      </main>
    </>
  );
}
