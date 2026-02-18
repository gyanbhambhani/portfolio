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
              <h1 className="font-display text-5xl font-bold text-bone mb-5 leading-tight">
                {about.intro}
              </h1>
            </header>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="mb-14">
              <p className="font-body text-[17px] text-ash leading-[1.8] whitespace-pre-line">
                {about.story}
              </p>
            </section>
          </Reveal>

          <div className="space-y-12">

            <RevealLine index={0}>
              <section>
                <p className="label-amber mb-5">Education</p>
                <div className="border-l-2 border-amber/30 pl-5">
                  <p className="font-display text-lg font-medium text-bone mb-1">
                    {about.education.school}
                  </p>
                  <p className="font-body text-ash mb-2">
                    {about.education.degree}
                  </p>
                  <p className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.12em]">
                    Expected {about.education.graduation}
                  </p>
                </div>
              </section>
            </RevealLine>

            <RevealLine index={1}>
              <section>
                <p className="label-amber mb-5">Other things</p>
                <ul className="space-y-3">
                  {about.interests.map((interest, i) => (
                    <li
                      key={i}
                      className="font-body text-[16px] text-ash flex gap-4 leading-relaxed"
                    >
                      <span className="text-amber/40 shrink-0 mt-0.5">—</span>
                      {interest}
                    </li>
                  ))}
                </ul>
              </section>
            </RevealLine>

            <RevealLine index={2}>
              <section className="pt-10 border-t border-edge">
                <p className="label-amber mb-5">Get in touch</p>
                <div className="space-y-3">
                  <div>
                    <a
                      href="mailto:gyanb@berkeley.edu"
                      className="font-mono text-[13px] text-ash hover:text-amber
                        transition-colors"
                    >
                      gyanb@berkeley.edu
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://linkedin.com/in/gyanbhambhani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] text-ash hover:text-amber
                        transition-colors"
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
