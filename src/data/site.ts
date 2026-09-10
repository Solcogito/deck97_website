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
  ogImage: '/media/deck97-og.png',
};

export const dispositions = ['RETURN', 'HOLD', 'ARCHIVE', 'AUCTION', 'DISPOSE', 'ESCALATE'] as const;
export const loop = ['RECEIVE', 'INSPECT', 'INVESTIGATE', 'DECIDE', 'LIVE WITH THE CONSEQUENCES'] as const;
