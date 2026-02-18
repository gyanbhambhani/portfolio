import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-24">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-stone-400">
            Gyan Bhambhani
          </p>
          
          <div className="flex gap-6">
            <a
              href="mailto:gyanb@berkeley.edu"
              className="font-body text-sm text-stone-500 hover:text-terracotta transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-stone-500 hover:text-terracotta transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-stone-500 hover:text-terracotta transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
