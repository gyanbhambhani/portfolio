'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-md border-b border-edge'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-mono text-xs text-ash/70 hover:text-bone transition-colors
            uppercase tracking-[0.2em]"
        >
          GB
        </Link>

        <div className="flex gap-7">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  isActive ? 'text-amber' : 'text-ash hover:text-bone'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
