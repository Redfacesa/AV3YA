export const LAB_LANDSCAPE = {
  group: '/lab/group.jpg',
  duo: '/lab/duo.jpg',
} as const;

export const LAB_PORTRAITS = {
  pinkFront: '/lab/pink-front.jpg',
  pinkBack: '/lab/pink-back.jpg',
  pinkSide: '/lab/pink-side.jpg',
  blueHood: '/lab/blue-hood.jpg',
  blueDown: '/lab/blue-down.jpg',
  blueKneel: '/lab/blue-kneel.jpg',
  blackStand: '/lab/black-stand.jpg',
  blackSit: '/lab/black-sit.jpg',
  whiteStand: '/lab/white-stand.jpg',
  whiteSit: '/lab/white-sit.jpg',
  whiteStool: '/lab/white-stool.jpg',
  whiteClose: '/lab/white-close.jpg',
  whiteCouch: '/lab/white-couch.jpg',
  whitePouf: '/lab/white-pouf.jpg',
  stools: '/lab/stools.jpg',
  duoLean: '/lab/duo-lean.jpg',
  leoWoman: '/lab/leo-woman.jpg',
  leoMan: '/lab/leo-man.jpg',
  leoHood: '/lab/leo-hood.jpg',
  leoFull: '/lab/leo-full.jpg',
} as const;

export const LAB_TURN_FRAMES = [
  LAB_PORTRAITS.blackStand,
  LAB_PORTRAITS.blueHood,
  LAB_PORTRAITS.whiteStand,
  LAB_PORTRAITS.pinkFront,
  LAB_PORTRAITS.leoFull,
] as const;

export const LAB_COLORWAYS = [
  {
    id: 'blue',
    label: 'Experiment 005',
    name: 'Cobalt Syndicate',
    src: LAB_PORTRAITS.blueDown,
    tint: 'from-sky-400/20',
  },
  {
    id: 'white',
    label: 'Experiment 001',
    name: 'Origin White',
    src: LAB_PORTRAITS.whiteStand,
    tint: 'from-white/40',
  },
  {
    id: 'pink',
    label: 'Experiment 004',
    name: 'Magenta Specimen',
    src: LAB_PORTRAITS.pinkFront,
    tint: 'from-pink-400/20',
  },
] as const;

export const LAB_LOOKBOOK = LAB_LANDSCAPE.group;
export const LAB_PRODUCTS = LAB_LANDSCAPE.duo;

export const LAB_SPECIAL = [
  { src: LAB_PORTRAITS.leoWoman, label: 'Leopard zip' },
  { src: LAB_PORTRAITS.whiteCouch, label: 'Fleece set' },
  { src: LAB_PORTRAITS.pinkBack, label: 'Lace panel' },
  { src: LAB_PORTRAITS.stools, label: 'Studio pair' },
] as const;

export const LAB_TRAYS = [
  { src: LAB_PORTRAITS.duoLean, label: 'Collection stills' },
  { src: LAB_PORTRAITS.leoHood, label: 'Campaign frames' },
  { src: LAB_PORTRAITS.whiteSit, label: 'Lab notes' },
] as const;

export const LAB_ARCHIVE = [
  LAB_LANDSCAPE.group,
  LAB_LANDSCAPE.duo,
  ...Object.values(LAB_PORTRAITS),
];
