import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Reveal, RevealLine } from '@/components/Motion';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">

          <Reveal>
            <header className="mb-16">
              <p className="label-amber mb-4">Index</p>
              <h1 className="font-display text-5xl font-bold text-bone mb-4 leading-tight">
                Projects
              </h1>
              <p className="font-body italic text-lg text-ash">
                Things I&apos;ve built. Some worked, some didn&apos;t. All taught me something.
              </p>
            </header>
          </Reveal>

          <div className="border-t border-edge">
            {projects.map((project, i) => (
              <RevealLine key={project.slug} index={i}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block py-7 border-b border-edge
                    hover:border-ash/30 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-[10px] text-ash/35 pt-[3px] shrink-0 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <h2 className="font-display text-xl font-semibold text-bone
                          group-hover:text-amber transition-colors duration-200">
                          {project.title}
                        </h2>
                        <span className="font-mono text-[10px] text-ash/40 shrink-0">
                          {project.year}
                        </span>
                      </div>
                      <p className="font-body text-ash mb-2 leading-snug">
                        {project.tagline}
                      </p>
                      <p className="font-body text-sm text-ash/55 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </RevealLine>
            ))}
          </div>

        </div>
        <Footer />
      </main>
    </>
  );
}
