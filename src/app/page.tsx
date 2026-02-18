import Link from 'next/link';
import { projects } from '@/lib/data';

export default function Home() {
  const recentProjects = projects.slice(0, 4);

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-20">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Gyan Bhambhani
          </h1>
          <p className="font-body text-xl text-stone-500 max-w-lg">
            I build things. Currently at Berkeley studying Business and Data Science.
          </p>
        </header>

        <nav className="mb-20">
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/projects" 
              className="font-body text-stone-600 hover:text-terracotta transition-colors"
            >
              Projects
            </Link>
            <span className="text-stone-300">/</span>
            <Link 
              href="/work" 
              className="font-body text-stone-600 hover:text-terracotta transition-colors"
            >
              Work
            </Link>
            <span className="text-stone-300">/</span>
            <Link 
              href="/research" 
              className="font-body text-stone-600 hover:text-terracotta transition-colors"
            >
              Research
            </Link>
            <span className="text-stone-300">/</span>
            <Link 
              href="/about" 
              className="font-body text-stone-600 hover:text-terracotta transition-colors"
            >
              About
            </Link>
            <span className="text-stone-300">/</span>
            <Link 
              href="/writing" 
              className="font-body text-stone-600 hover:text-terracotta transition-colors"
            >
              Writing
            </Link>
          </div>
        </nav>

        <section>
          <h2 className="font-display text-sm font-semibold text-stone-400 uppercase tracking-wider mb-6">
            Recent
          </h2>
          <div className="space-y-6">
            {recentProjects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <div className="flex justify-between items-baseline gap-4">
                  <div>
                    <h3 className="font-display text-lg font-medium text-stone-800 
                      group-hover:text-terracotta transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-stone-500 mt-1">
                      {project.tagline}
                    </p>
                  </div>
                  <span className="font-body text-sm text-stone-400 shrink-0">
                    {project.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link 
            href="/projects" 
            className="inline-block mt-8 font-body text-sm text-terracotta hover:underline"
          >
            View all projects →
          </Link>
        </section>

        <section className="mt-20 pt-12 border-t border-stone-200">
          <p className="font-body text-stone-500">
            <a 
              href="mailto:gyanb@berkeley.edu" 
              className="text-stone-700 hover:text-terracotta transition-colors"
            >
              gyanb@berkeley.edu
            </a>
            {' · '}
            <a 
              href="https://linkedin.com/in/gyanbhambhani" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-terracotta transition-colors"
            >
              LinkedIn
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
