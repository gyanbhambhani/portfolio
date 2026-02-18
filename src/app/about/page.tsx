import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { about } from '@/lib/data';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
              About
            </h1>
            <p className="font-body text-xl text-stone-600">
              {about.intro}
            </p>
          </header>

          <div className="space-y-12">
            <section>
              <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                {about.story}
              </p>
            </section>

            <section>
              <h2 className="font-display text-sm font-semibold text-stone-400 
                uppercase tracking-wider mb-4">
                Education
              </h2>
              <div>
                <p className="font-body text-stone-800">
                  {about.education.school}
                </p>
                <p className="font-body text-stone-600">
                  {about.education.degree}
                </p>
                <p className="font-body text-sm text-stone-400 mt-1">
                  Expected {about.education.graduation}
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-sm font-semibold text-stone-400 
                uppercase tracking-wider mb-4">
                Other things
              </h2>
              <ul className="space-y-2">
                {about.interests.map((interest, index) => (
                  <li key={index} className="font-body text-stone-600 flex gap-3">
                    <span className="text-stone-300">—</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-8 border-t border-stone-200">
              <h2 className="font-display text-sm font-semibold text-stone-400 
                uppercase tracking-wider mb-4">
                Get in touch
              </h2>
              <div className="space-y-2">
                <p>
                  <a 
                    href="mailto:gyanb@berkeley.edu" 
                    className="font-body text-stone-700 hover:text-terracotta transition-colors"
                  >
                    gyanb@berkeley.edu
                  </a>
                </p>
                <p>
                  <a 
                    href="https://linkedin.com/in/gyanbhambhani" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-stone-700 hover:text-terracotta transition-colors"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
