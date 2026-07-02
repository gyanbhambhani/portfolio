import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Footer from '@/components/Footer';
import GlowCard from '@/components/GlowCard';
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
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">

        <Reveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white
              text-xs uppercase tracking-[0.15em] transition-colors duration-150 mb-12"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            Projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <header className="mb-14">
            <span className="text-white/40 text-xs uppercase tracking-[0.15em]">
              {project.year}
            </span>
            <h1 className="font-serif-display text-5xl md:text-7xl text-white
              tracking-tight leading-[1.05] mt-3 mb-4">
              {project.title}
            </h1>
            <p className="font-serif-display italic text-xl md:text-2xl text-white/60
              leading-relaxed">
              {project.tagline}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-14">
            {project.description}
          </p>
        </Reveal>

        <div className="space-y-6 mb-14">
          {sections.map((section, i) => (
            <RevealLine key={section.label} index={i}>
              <GlowCard borderRadius={24}>
                <section className="p-8 md:p-10">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                    {section.label}
                  </p>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed
                    whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              </GlowCard>
            </RevealLine>
          ))}
        </div>

        <Reveal delay={0.1}>
          <section className="mb-12">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Built with</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="liquid-glass rounded-full text-white/70 text-xs px-4 py-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {project.url && (
          <Reveal delay={0.15}>
            <div className="pt-10 border-t border-white/10">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 liquid-glass rounded-full
                  px-8 py-3 text-white text-sm font-medium hover:bg-white/5
                  transition-colors duration-150"
              >
                <span>Visit project</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform duration-150 group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>
        )}

      </div>
      <Footer />
    </main>
  );
}
