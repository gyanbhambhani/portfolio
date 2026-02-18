import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/Motion';

export default function WritingPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

          <Reveal>
            <header className="mb-16">
              <p className="label-amber mb-4">Writing</p>
              <h1 className="font-display text-5xl font-bold text-bone mb-4 leading-tight">
                Writing
              </h1>
              <p className="font-body italic text-lg text-ash">
                Thoughts, ideas, and things I&apos;m figuring out.
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="py-20 border-t border-edge">
              <p className="font-mono text-[11px] text-ash/40 uppercase tracking-[0.2em]">
                Coming soon
              </p>
            </div>
          </Reveal>

        </div>
        <Footer />
      </main>
    </>
  );
}
