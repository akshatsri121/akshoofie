import { describe, expect, it } from 'vitest';
import { filterInterests, type InterestItem } from './interests';

const items: InterestItem[] = [
  {
    slug: 'night-drive',
    title: 'Night Drive',
    summary: 'A synth playlist',
    category: 'music',
    status: 'active',
    date: '2026-08-01',
  },
  {
    slug: 'pixel-quest',
    title: 'Pixel Quest',
    summary: 'A tiny game',
    category: 'games',
    status: 'completed',
    date: '2026-07-01',
  },
];

const defaults = {
  query: '',
  category: '',
};

describe('filterInterests', () => {
  it('searches titles and summaries', () => {
    expect(filterInterests(items, { ...defaults, query: 'synth' })).toEqual([
      items[0],
    ]);
  });

  it('filters by category', () => {
    expect(
      filterInterests(items, {
        ...defaults,
        category: 'games',
      }),
    ).toEqual([items[1]]);
  });
});
