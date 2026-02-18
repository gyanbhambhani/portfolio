import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { research } from '@/lib/data';

export default function ResearchPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
              Research
            </h1>
            <p className="font-body text-stone-500">
              Exploring ideas at the edge of what's possible.
            </p>
          </header>

          <article>
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="font-display text-2xl font-medium text-stone-800">
                  {research.title}
                </h2>
                <span className="font-body text-sm text-stone-400">
                  {research.period}
                </span>
              </div>
              <p className="font-body text-lg text-stone-600">
                {research.description}
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="font-display text-sm font-semibold text-stone-400 
                  uppercase tracking-wider mb-3">
                  The Problem
                </h3>
                <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                  {research.problem}
                </p>
              </section>

              <section>
                <h3 className="font-display text-sm font-semibold text-stone-400 
                  uppercase tracking-wider mb-3">
                  The Approach
                </h3>
                <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                  {research.approach}
                </p>
              </section>

              <section>
                <h3 className="font-display text-sm font-semibold text-stone-400 
                  uppercase tracking-wider mb-3">
                  The Outcome
                </h3>
                <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                  {research.outcome}
                </p>
              </section>
            </div>
          </article>
        </div>
        <Footer />
      </main>
    </>
  );
}
