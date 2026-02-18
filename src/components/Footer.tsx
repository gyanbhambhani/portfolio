export default function Footer() {
  return (
    <footer className="border-t border-edge mt-24">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash/50">
            © 2025 Gyan Bhambhani
          </p>

          <div className="flex gap-6">
            <a
              href="mailto:gyanb@berkeley.edu"
              className="font-mono text-[11px] text-ash hover:text-amber transition-colors
                uppercase tracking-[0.12em]"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ash hover:text-amber transition-colors
                uppercase tracking-[0.12em]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ash hover:text-amber transition-colors
                uppercase tracking-[0.12em]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
