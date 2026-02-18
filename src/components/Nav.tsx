'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="font-display text-lg font-semibold text-stone-800 hover:text-terracotta transition-colors"
        >
          Gyan
        </Link>
        
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm transition-colors ${
                pathname === link.href || pathname?.startsWith(link.href + '/')
                  ? 'text-terracotta'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
