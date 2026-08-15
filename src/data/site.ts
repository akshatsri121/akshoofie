export const site = {
  name: 'Akshat Srivastava',
  shortName: 'akshoofie',
  title: "Akshat's personal universe",
  description:
    'The personal website of Akshat Srivastava: music, stories, games, movement, experiments, and everything he is learning along the way.',
  intro:
    "Hi, I'm Akshat. I like listening to music, watching stuff, playing games, going to the gym, and running.",
  email: '',
  socials: [
    {
      label: 'Instagram',
      handle: '@akshatsri08',
      href: 'https://www.instagram.com/akshatsri08/',
    },
    {
      label: 'Discord',
      handle: 'aksri123',
      href: '',
    },
    {
      label: 'GitHub',
      handle: 'akshatsri121',
      href: 'https://github.com/akshatsri121',
    },
    {
      label: 'LinkedIn',
      handle: 'akshat-srivastava-a34300294',
      href: 'https://www.linkedin.com/in/akshat-srivastava-a34300294/',
    },
    {
      label: 'Steam',
      handle: '76561199067124109',
      href: 'https://steamcommunity.com/profiles/76561199067124109',
    },
  ],
} as const;

export const categories = [
  { slug: 'anime', label: 'Anime', glyph: 'AN' },
  { slug: 'music', label: 'Music', glyph: 'MU' },
  { slug: 'games', label: 'Games', glyph: 'GM' },
  { slug: 'shows', label: 'Shows', glyph: 'TV' },
  { slug: 'movies', label: 'Movies', glyph: 'MV' },
  { slug: 'hobbies', label: 'Niche hobbies', glyph: '++' },
] as const;

export type Category = (typeof categories)[number]['slug'];

export const categoryLabel = (slug: string) =>
  categories.find((category) => category.slug === slug)?.label ?? slug;
