export const site = {
  name: 'DECK 97',
  url: 'https://deck97game.com',
  title: 'DECK 97 — A civilization is what it refuses to throw away.',
  description:
    'Inspect disputed objects, uncover their histories, and decide what civilization keeps in DECK 97.',
  studio: 'Solcogito',
  platform: 'PC / Windows',
  releaseState: 'Coming to Steam',
  steamUrl: null as string | null,
  kickstarterUrl: null as string | null,
  contactUrl: null as string | null,
  socialUrls: [] as Array<{ label: string; url: string }>,
  heroImage: '/media/deck97-hero.png',
  ogImage: '/media/deck97-hero.png',
};

export const media = {
  hero: {
    src: '/media/deck97-hero.png',
    width: 1286,
    height: 752,
    alt: 'DECK 97 visual development image of the lost-property inspection setting.',
  },
  object: {
    src: '/media/deck97-object.png',
    width: 1277,
    height: 745,
    alt: 'DECK 97 visual development image centered on an object under inspection.',
  },
  gallery: [
    { src: '/media/deck97-field-01.png', width: 1282, height: 751, alt: 'DECK 97 visual development image.' },
    { src: '/media/deck97-field-02.png', width: 1282, height: 752, alt: 'DECK 97 visual development image.' },
    { src: '/media/deck97-field-03.png', width: 1283, height: 733, alt: 'DECK 97 visual development image.' },
    { src: '/media/deck97-field-04.png', width: 1280, height: 753, alt: 'DECK 97 visual development image.' },
    { src: '/media/deck97-field-05.png', width: 1279, height: 748, alt: 'DECK 97 visual development image.' },
  ],
};

export const dispositions = ['RETURN', 'HOLD', 'ARCHIVE', 'AUCTION', 'DISPOSE', 'ESCALATE'] as const;
export const loop = ['RECEIVE', 'INSPECT', 'INVESTIGATE', 'DECIDE', 'LIVE WITH THE CONSEQUENCES'] as const;
