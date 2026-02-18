import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
              Projects
            </h1>
            <p className="font-body text-stone-500">
              Things I've built. Some worked, some didn't. All taught me something.
            </p>
          </header>

          <div className="space-y-8">
            {projects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <article className="border-b border-stone-200 pb-8">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h2 className="font-display text-xl font-medium text-stone-800 
                      group-hover:text-terracotta transition-colors">
                      {project.title}
                    </h2>
                    <span className="font-body text-sm text-stone-400 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="font-body text-stone-600 mb-3">
                    {project.tagline}
                  </p>
                  <p className="font-body text-sm text-stone-500">
                    {project.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
