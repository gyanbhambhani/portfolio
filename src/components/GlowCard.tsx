'use client';

import { ReactNode } from 'react';
import BorderGlow from './BorderGlow';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  borderRadius?: number;
  animated?: boolean;
  backgroundColor?: string;
}

/**
 * Themed BorderGlow for this site: monochrome white glow on near-black cards,
 * matching the black / liquid-glass aesthetic.
 */
export default function GlowCard({
  children,
  className = '',
  borderRadius = 24,
  animated = false,
  backgroundColor = '#0d0d0f',
}: GlowCardProps) {
  return (
    <BorderGlow
      className={className}
      borderRadius={borderRadius}
      animated={animated}
      backgroundColor={backgroundColor}
      glowColor="0 0 100"
      colors={['#ffffff', '#d4d4d8', '#a1a1aa']}
      glowRadius={36}
      glowIntensity={0.9}
      coneSpread={25}
      edgeSensitivity={30}
      fillOpacity={0.4}
    >
      {children}
    </BorderGlow>
  );
}
