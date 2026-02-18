import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Reveal, RevealLine } from '@/components/Motion';
import { about } from '@/lib/data';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

          <Reveal>
            <header className="mb-14">
              <p className="label-amber mb-4">About</p>
              <h1
                className="font-display font-bold text-bone mb-5 leading-tight
                  tracking-[-0.01em]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
              >
                {about.intro}
              </h1>
            </header>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="mb-16">
              <p className="font-body text-[17px] text-ash/80 leading-[1.85]
                whitespace-pre-line">
                {about.story}
              </p>
            </section>
          </Reveal>

          <div className="space-y-14">

            <RevealLine index={0}>
              <section>
                <p className="label-amber mb-6">Education</p>
                <div className="flex gap-6 items-start">
                  {/* Amber left accent */}
                  <div className="w-[2px] bg-amber/30 self-stretch shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-lg font-semibold text-bone mb-1.5">
                      {about.education.school}
                    </p>
                    <p className="font-body text-ash/70 mb-2">
                      {about.education.degree}
                    </p>
                    <p className="font-mono text-[10px] text-ash/40 uppercase
                      tracking-[0.15em]">
                      Expected {about.education.graduation}
                    </p>
                  </div>
                </div>
              </section>
            </RevealLine>

            <RevealLine index={1}>
              <section>
                <p className="label-amber mb-6">Other things</p>
                <ul className="space-y-4">
                  {about.interests.map((interest, i) => (
                    <li key={i} className="flex gap-5 items-baseline">
                      <span className="font-mono text-[10px] text-amber/60
                        shrink-0 tabular-nums tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-[16px] text-ash/80 leading-relaxed">
                        {interest}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </RevealLine>

            <RevealLine index={2}>
              <section className="pt-12 border-t border-edge">
                <p className="label-amber mb-6">Get in touch</p>
                <div className="space-y-3">
                  <div>
                    <a
                      href="mailto:gyanb@berkeley.edu"
                      className="font-mono text-[13px] text-ash/60 hover:text-amber
                        transition-colors duration-200"
                    >
                      gyanb@berkeley.edu
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://linkedin.com/in/gyanbhambhani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] text-ash/60 hover:text-amber
                        transition-colors duration-200"
                    >
                      linkedin.com/in/gyanbhambhani
                    </a>
                  </div>
                </div>
              </section>
            </RevealLine>

          </div>

        </div>
        <Footer />
      </main>
    </>
  );
}
