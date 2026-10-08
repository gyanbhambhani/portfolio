'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Briefcase, FlaskConical, FolderKanban, Mail, PenLine, User, type LucideIcon } from 'lucide-react';
import Logo from './Logo';

const EMAIL = 'gyanb@berkeley.edu';

type Item = {
  href: string;
  label: string;
  Icon: LucideIcon;
  external?: boolean;
};

// Logo adapted to the LucideIcon shape so the dock can treat every item alike.
const HomeMark = (({ className }: { className?: string }) => (
  <Logo size={26} className={className} />
)) as unknown as LucideIcon;

const items: Item[] = [
  { href: '/', label: 'Home', Icon: HomeMark },
  { href: '/projects', label: 'Projects', Icon: FolderKanban },
  { href: '/work', label: 'Work', Icon: Briefcase },
  { href: '/research', label: 'Research', Icon: FlaskConical },
  { href: '/about', label: 'About', Icon: User },
  { href: '/writing', label: 'Writing', Icon: PenLine },
];

const BASE = 44;
const PEAK = 68;

function DockItem({
  item,
  mouseX,
  active,
}: {
  item: Item;
  mouseX: MotionValue<number>;
  active: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);

  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? v - b.x - b.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(distance, [-120, 0, 120], [BASE, PEAK, BASE]), {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });
  const iconSize = useTransform(size, [BASE, PEAK], [20, 30]);

  const { Icon } = item;
  const common = {
    ref,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    'aria-label': item.label,
    'aria-current': active ? ('page' as const) : undefined,
    className: 'relative flex items-end justify-center',
  };

  const body = (
    <>
      {hover && (
        <span
          className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap
            rounded-full bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 text-xs text-white"
        >
          {item.label}
        </span>
      )}
      <motion.span
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-full transition-colors duration-150 ${
          active ? 'bg-white/15 text-white' : 'bg-white/[0.06] text-white/75 hover:text-white'
        }`}
      >
        <motion.span style={{ width: iconSize, height: iconSize }} className="flex">
          <Icon className="w-full h-full" strokeWidth={1.6} />
        </motion.span>
      </motion.span>
      {active && (
        <span className="absolute -bottom-2 h-1 w-1 rounded-full bg-[#a9b8ff] shadow-[0_0_8px_2px_rgba(169,184,255,0.7)]" />
      )}
    </>
  );

  return item.external ? (
    <a href={item.href} {...common}>{body}</a>
  ) : (
    <Link href={item.href} {...common}>{body}</Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(href + '/');

  return (
    <nav
      aria-label="Primary"
      className="dock-in fixed bottom-4 md:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-3"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto origin-bottom scale-[0.84] sm:scale-100 flex items-end gap-1.5 md:gap-2 rounded-full px-2.5 py-2.5
          bg-black/45 backdrop-blur-xl border border-white/15
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        {items.map((item) => (
          <DockItem key={item.href} item={item} mouseX={mouseX} active={isActive(item.href)} />
        ))}
        <span aria-hidden className="self-center mx-1 h-7 w-px bg-white/15" />
        <DockItem
          item={{ href: `mailto:${EMAIL}`, label: 'Say hi', Icon: Mail, external: true }}
          mouseX={mouseX}
          active={false}
        />
      </div>
    </nav>
  );
}
