/** Orbit-G mark: a "G" drawn as an open orbit with a star where it breaks. */
export default function Logo({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M46.2 21.5A17 17 0 1 0 49 32H35.5"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47 8 L49.2 14.6 L55.8 16.8 L49.2 19 L47 25.6 L44.8 19 L38.2 16.8 L44.8 14.6 Z"
        fill="#a9b8ff"
      />
    </svg>
  );
}
