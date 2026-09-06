import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        av3ya: {
          void: '#000000',
          black: '#0a0a0a',
          dark: '#111111',
          neon: 'var(--av3ya-accent)',
          pink: '#0a0a0a',
          purple: '#525252',
          glow: 'var(--av3ya-active)',
          mist: '#f7f7f5',
          lab: '#f7f7f5',
          active: 'var(--av3ya-active)',
          testing: 'var(--av3ya-testing)',
          classified: 'var(--av3ya-classified)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
