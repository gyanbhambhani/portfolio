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
              <p className="font-body italic text-lg text-ash/70">
                Things I&apos;ve built. Some worked, some didn&apos;t. All taught me something.
              </p>
            </header>
          </Reveal>

          {/* 2-column grid separated by 1px edge gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-edge">
            {projects.map((project, i) => (
              <RevealLine key={project.slug} index={i}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block bg-ink hover:bg-rail
                    transition-colors duration-200 cursor-pointer p-8 h-full
                    overflow-hidden"
                >
                  {/* Top amber line that draws in from left on hover */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] bg-amber
                      origin-left scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 ease-out"
                  />

                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[10px] text-ash/30
                      group-hover:text-amber/50 transition-colors duration-200">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] text-ash/30">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-semibold text-bone
                    group-hover:text-amber transition-colors duration-200
                    mb-3 leading-tight">
                    {project.title}
                  </h2>

                  <p className="font-body text-[15px] text-ash/70 leading-relaxed mb-10">
                    {project.tagline}
                  </p>

                  <div className="flex items-end justify-between gap-4">
                    {/* Tech as plain dot-separated text — no box clutter */}
                    <p className="font-mono text-[9px] text-ash/35 uppercase
                      tracking-[0.12em] leading-relaxed">
                      {project.tech.slice(0, 3).join(' · ')}
                    </p>

                    <span
                      className="font-mono text-[15px] text-ash/20
                        group-hover:text-amber transition-colors duration-200
                        group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                        transition-transform shrink-0"
                    >
                      →
                    </span>
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
