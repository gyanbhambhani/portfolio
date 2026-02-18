import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { workExperiences } from '@/lib/data';

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
              Work
            </h1>
            <p className="font-body text-stone-500">
              What I've been doing. Focus on the work, not the titles.
            </p>
          </header>

          <div className="space-y-12">
            {workExperiences.map((work, index) => (
              <article key={index} className="border-b border-stone-200 pb-12 last:border-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4">
                  <h2 className="font-display text-xl font-medium text-stone-800">
                    {work.company}
                  </h2>
                  <span className="font-body text-sm text-stone-400">
                    {work.period}
                  </span>
                </div>
                
                <p className="font-body text-terracotta text-sm mb-4">
                  {work.role}
                </p>
                
                <p className="font-body text-stone-600 mb-6">
                  {work.description}
                </p>

                <ul className="space-y-2">
                  {work.highlights.map((highlight, i) => (
                    <li key={i} className="font-body text-sm text-stone-500 flex gap-3">
                      <span className="text-stone-300">—</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
