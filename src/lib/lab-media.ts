export const LAB_TURN_FRAMES = [
  '/lab/m1.jpg',
  '/lab/m2.jpg',
  '/lab/m3.jpg',
  '/lab/m5.jpg',
  '/lab/m4.jpg',
] as const;

export const LAB_COLORWAYS = [
  {
    id: 'blue',
    label: 'Experiment 005',
    name: 'Cobalt Syndicate',
    src: '/lab/m5.jpg',
    tint: 'from-sky-400/20',
  },
  {
    id: 'white',
    label: 'Experiment 001',
    name: 'Origin White',
    src: '/lab/m3.jpg',
    tint: 'from-white/40',
  },
  {
    id: 'pink',
    label: 'Experiment 004',
    name: 'Magenta Specimen',
    src: '/lab/m4.jpg',
    tint: 'from-pink-400/20',
  },
] as const;

export const LAB_LOOKBOOK = '/lab/lookbook.jpg';
export const LAB_PRODUCTS = '/lab/m6.jpg';
