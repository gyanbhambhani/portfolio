'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !menuOpen
            ? 'bg-ink/90 backdrop-blur-md border-b border-edge'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-base text-ash/70 hover:text-bone transition-colors
              uppercase tracking-[0.2em]"
          >
            GB
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-[15px] uppercase tracking-[0.15em]
                    transition-colors duration-200 ${
                    isActive ? 'text-amber' : 'text-ash hover:text-bone'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <span className="text-edge select-none">|</span>
            <ThemeToggle />
          </div>

          {/* Mobile right side: theme toggle + hamburger */}
          <div className="flex items-center gap-5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]
                cursor-pointer"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="block w-5 h-px bg-bone origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-px bg-bone origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="block w-5 h-px bg-bone origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-center px-8 md:hidden"
          >
            {/* Grain overlay consistency */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '300px 300px',
              }}
            />

            <nav className="relative space-y-1">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-display font-bold py-3 transition-colors
                        duration-200 border-b border-edge/50 ${
                        isActive ? 'text-amber' : 'text-bone/80 hover:text-amber'
                      }`}
                      style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
