import Footer from '@/components/Footer';
import GlowCard from '@/components/GlowCard';
import { Reveal, RevealLine } from '@/components/Motion';
import { research } from '@/lib/data';

const sections = [
  { label: 'The Problem', content: research.problem },
  { label: 'The Approach', content: research.approach },
  { label: 'The Outcome', content: research.outcome },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">

        <Reveal>
          <header className="mb-16">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Research</p>
            <h1 className="font-serif-display text-5xl md:text-7xl text-white
              tracking-tight leading-[1.05] mb-5">
              Quantum Semantic Drift
            </h1>
            <p className="font-serif-display italic text-xl md:text-2xl text-white/60">
              {research.description}
            </p>
            <p className="text-white/40 text-xs uppercase tracking-[0.15em] mt-4">
              {research.period}
            </p>
          </header>
        </Reveal>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <RevealLine key={section.label} index={i}>
              <GlowCard borderRadius={24}>
                <section className="p-8 md:p-10">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                    {section.label}
                  </p>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed
                    whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              </GlowCard>
            </RevealLine>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
