/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-instrument)', 'Georgia', 'serif'],
        mono: ['var(--font-dm-mono)', 'Courier New', 'monospace'],
      },
      colors: {
        // CSS variable-based colors — switch automatically with .dark class
        ink:   'rgb(var(--color-bg)    / <alpha-value>)',
        bone:  'rgb(var(--color-fg)    / <alpha-value>)',
        amber: 'rgb(var(--color-accent)/ <alpha-value>)',
        ash:   'rgb(var(--color-muted) / <alpha-value>)',
        rail:  'rgb(var(--color-surface)/<alpha-value>)',
        edge:  'rgb(var(--color-border)/ <alpha-value>)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
