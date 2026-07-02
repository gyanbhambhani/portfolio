import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { href: 'mailto:gyanb@berkeley.edu', label: 'Email', Icon: Mail },
  { href: 'https://linkedin.com/in/gyanbhambhani', label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: 'https://github.com/gyanbhambhani', label: 'GitHub', Icon: Github, external: true },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-serif-display text-3xl text-white/90">
            Let&apos;s build something.
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="liquid-glass rounded-full p-4 text-white/80 hover:text-white
                  hover:bg-white/5 transition-all duration-150 active:scale-95"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row
          justify-between items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
            © 2026 Gyan Bhambhani
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
            Berkeley · AI · Venture
          </p>
        </div>
      </div>
    </footer>
  );
}
