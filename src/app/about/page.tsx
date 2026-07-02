import Footer from '@/components/Footer';
import GlowCard from '@/components/GlowCard';
import { Reveal, RevealLine } from '@/components/Motion';
import { about } from '@/lib/data';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">

        <Reveal>
          <header className="mb-14">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-6">About</p>
            <h1 className="font-serif-display text-5xl md:text-7xl text-white
              tracking-tight leading-[1.05]">
              {about.intro}
            </h1>
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <section className="mb-16">
            <p className="text-white/70 text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {about.story}
            </p>
          </section>
        </Reveal>

        <div className="space-y-6">

          <RevealLine index={0}>
            <GlowCard borderRadius={24}>
              <section className="p-8 md:p-10">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Education</p>
                <p className="font-serif-display text-2xl text-white mb-2">
                  {about.education.school}
                </p>
                <p className="text-white/60 mb-3">{about.education.degree}</p>
                <p className="text-white/40 text-xs uppercase tracking-[0.15em]">
                  Expected {about.education.graduation}
                </p>
              </section>
            </GlowCard>
          </RevealLine>

          <RevealLine index={1}>
            <GlowCard borderRadius={24}>
              <section className="p-8 md:p-10">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Other things</p>
                <ul className="space-y-4">
                  {about.interests.map((interest, i) => (
                    <li key={i} className="flex gap-5 items-baseline">
                      <span className="text-white/40 text-xs shrink-0 tabular-nums tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white/80 text-base leading-relaxed">{interest}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </GlowCard>
          </RevealLine>

          <RevealLine index={2}>
            <GlowCard borderRadius={24}>
              <section className="p-8 md:p-10">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Get in touch</p>
                <div className="space-y-3">
                <div>
                  <a
                    href="mailto:gyanb@berkeley.edu"
                    className="link-line text-white/70 hover:text-white text-sm
                      transition-colors duration-150"
                  >
                    gyanb@berkeley.edu
                  </a>
                </div>
                <div>
                  <a
                    href="https://linkedin.com/in/gyanbhambhani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-white/70 hover:text-white text-sm
                      transition-colors duration-150"
                  >
                    linkedin.com/in/gyanbhambhani
                  </a>
                </div>
              </div>
              </section>
            </GlowCard>
          </RevealLine>

        </div>

      </div>
      <Footer />
    </main>
  );
}
