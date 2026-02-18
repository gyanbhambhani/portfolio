import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Reveal, RevealLine } from '@/components/Motion';
import { research } from '@/lib/data';

const sections = [
  { label: 'The Problem', content: research.problem },
  { label: 'The Approach', content: research.approach },
  { label: 'The Outcome', content: research.outcome },
];

export default function ResearchPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

          <Reveal>
            <header className="mb-16">
              <p className="label-amber mb-4">Research</p>
              <h1 className="font-display text-5xl font-bold text-bone mb-4 leading-tight">
                Quantum<br />Semantic Drift
              </h1>
              <div className="flex items-center gap-4">
                <p className="font-body italic text-lg text-ash">
                  {research.description}
                </p>
              </div>
              <p className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.15em] mt-3">
                {research.period}
              </p>
            </header>
          </Reveal>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <RevealLine key={section.label} index={i}>
                <section>
                  <p className="label-amber mb-4">{section.label}</p>
                  <p className="font-body text-[17px] text-ash leading-[1.75]
                    whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              </RevealLine>
            ))}
          </div>

        </div>
        <Footer />
      </main>
    </>
  );
}
