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
          void: '#07000f',
          black: '#0a0014',
          dark: '#12001f',
          neon: '#ff2d95',
          pink: '#ff6ec7',
          purple: '#b026ff',
          glow: '#e040fb',
          mist: '#f8e8ff',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Orbitron', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 24px rgba(255, 45, 149, 0.45), 0 0 48px rgba(176, 38, 255, 0.25)',
        'neon-sm': '0 0 12px rgba(255, 45, 149, 0.35)',
      },
      backgroundImage: {
        'av3ya-grid':
          'linear-gradient(rgba(255, 45, 149, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 38, 255, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
};

export default config;
