'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import BorderGlow from './BorderGlow';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
      >
        <BorderGlow
          className="max-w-5xl mx-auto"
          borderRadius={40}
          glowColor="0 0 100"
          backgroundColor="#0a0a0c"
          colors={['#ffffff', '#d4d4d8', '#a1a1aa']}
          glowRadius={26}
          glowIntensity={0.9}
          coneSpread={25}
          edgeSensitivity={30}
          fillOpacity={0.4}
        >
          <div className="px-6 py-3 flex items-center justify-between w-full">
          {/* Left: brand + desktop links */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Globe size={22} className="text-white" strokeWidth={1.5} />
              <span className="text-white font-semibold text-lg tracking-tight">Gyan</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 ml-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-150 ${
                      isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: contact actions + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:gyanb@berkeley.edu"
              className="hidden sm:inline-block text-white text-sm font-medium
                px-3 hover:text-white/80 transition-colors duration-150"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/gyanbhambhani"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block liquid-glass rounded-full px-6 py-2
                text-white text-sm font-medium hover:bg-white/5 transition-colors duration-150"
            >
              Connect
            </a>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden liquid-glass rounded-full p-2.5 text-white
                active:scale-95 transition-transform duration-150"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          </div>
        </BorderGlow>
      </motion.div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="space-y-1">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`font-serif-display block py-3 border-b border-white/10
                        transition-colors duration-150 ${
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                      style={{ fontSize: 'clamp(2.2rem, 9vw, 3.2rem)' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-10 flex gap-4">
              <a
                href="mailto:gyanb@berkeley.edu"
                className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/gyanbhambhani"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium"
              >
                Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
