import Footer from '@/components/Footer';
import GlowCard from '@/components/GlowCard';
import { Reveal } from '@/components/Motion';

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">

        <Reveal>
          <header className="mb-16">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Writing</p>
            <h1 className="font-serif-display text-5xl md:text-7xl text-white tracking-tight mb-5">
              Writing
            </h1>
            <p className="font-serif-display italic text-xl md:text-2xl text-white/60">
              Thoughts, ideas, and things I&apos;m figuring out.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <GlowCard borderRadius={24}>
            <div className="p-12 md:p-16 flex items-center justify-center">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Coming soon</p>
            </div>
          </GlowCard>
        </Reveal>

      </div>
      <Footer />
    </main>
  );
}
