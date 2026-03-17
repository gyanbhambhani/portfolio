export default function Footer() {
  return (
    <footer className="border-t border-edge/40 mt-24">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/30">
            © 2026 Gyan Bhambhani
          </p>

          <div className="flex gap-6">
            {[
              { href: 'mailto:gyanb@berkeley.edu', label: 'Email' },
              { href: 'https://linkedin.com/in/gyanbhambhani', label: 'LinkedIn', external: true },
              { href: 'https://github.com/gyanbhambhani', label: 'GitHub', external: true },
            ].map(({ href, label, external }: { href: string; label: string; external?: boolean }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="link-line font-mono text-[10px] text-ash/50 uppercase
                  tracking-[0.12em]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
