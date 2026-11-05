/** Shared between SpaceBackground (owns the stars) and SwarmProbes (borrows them). */
export interface BridgeStar {
  /** current on-screen position (updated every frame by SpaceBackground) */
  cx: number;
  cy: number;
  r: number;
  depth: number;
  hue: number;
  /** true while a star is out building something; the background skips drawing it */
  away: boolean;
}

export const bridge: { stars: BridgeStar[] } = { stars: [] };
