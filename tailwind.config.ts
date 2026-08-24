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
          black: '#000000',
          dark: '#0a0a0a',
          neon: '#ff2d95',
          pink: '#ff6ec7',
          purple: '#b026ff',
          glow: '#e040fb',
          mist: '#f5f5f5',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
