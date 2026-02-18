import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Reveal, RevealLine } from '@/components/Motion';
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

  const sections = [
    { label: 'Why I built this', content: project.why },
    { label: 'What I learned', content: project.learned },
  ];

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-[10px] text-ash
                hover:text-amber uppercase tracking-[0.15em] transition-colors mb-12"
            >
              ← Projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <header className="mb-14">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-[10px] text-ash/40 uppercase tracking-[0.15em]">
                  {project.year}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-bone
                leading-tight mb-4">
                {project.title}
              </h1>
              <p className="font-body italic text-xl text-ash leading-relaxed">
                {project.tagline}
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-[17px] text-bone/80 leading-[1.75] mb-14">
              {project.description}
            </p>
          </Reveal>

          <div className="space-y-12 mb-14">
            {sections.map((section, i) => (
              <RevealLine key={section.label} index={i}>
                <section>
                  <p className="label-amber mb-4">{section.label}</p>
                  <p className="font-body text-[17px] text-ash leading-[1.75] whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              </RevealLine>
            ))}
          </div>

          <Reveal delay={0.1}>
            <section>
              <p className="label-amber mb-4">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-ash border border-edge
                      px-3 py-1.5 rounded-sm hover:border-ash/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          {project.url && (
            <Reveal delay={0.15}>
              <div className="mt-12 pt-10 border-t border-edge">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-mono text-[11px] text-amber
                    hover:text-bone uppercase tracking-[0.15em] transition-colors group"
                >
                  <span>Visit project</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5"
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
              </div>
            </Reveal>
          )}

        </div>
        <Footer />
      </main>
    </>
  );
}
