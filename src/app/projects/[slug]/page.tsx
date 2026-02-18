import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <Link 
            href="/projects" 
            className="inline-block font-body text-sm text-stone-500 hover:text-terracotta 
              transition-colors mb-8"
          >
            ← Back to projects
          </Link>

          <header className="mb-12">
            <div className="flex items-baseline gap-4 mb-3">
              <h1 className="font-display text-3xl font-bold text-stone-800">
                {project.title}
              </h1>
              <span className="font-body text-sm text-stone-400">
                {project.year}
              </span>
            </div>
            <p className="font-body text-xl text-stone-600">
              {project.tagline}
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <p className="font-body text-stone-700 leading-relaxed">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="font-display text-sm font-semibold text-stone-400 
                uppercase tracking-wider mb-3">
                Why I built this
              </h2>
              <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                {project.why}
              </p>
            </section>

            <section>
              <h2 className="font-display text-sm font-semibold text-stone-400 
                uppercase tracking-wider mb-3">
                What I learned
              </h2>
              <p className="font-body text-stone-700 leading-relaxed whitespace-pre-line">
                {project.learned}
              </p>
            </section>

            <section>
              <h2 className="font-display text-sm font-semibold text-stone-400 
                uppercase tracking-wider mb-3">
                Built with
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="font-body text-sm text-stone-600 bg-stone-100 px-3 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {project.url && (
              <section>
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-terracotta 
                    hover:underline"
                >
                  Visit project
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M7 17L17 7M17 7H7M17 7v10" 
                    />
                  </svg>
                </a>
              </section>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
