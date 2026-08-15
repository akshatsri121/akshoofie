import { getCollection, type CollectionEntry } from 'astro:content';
import type { InterestItem } from './interests';

export const entrySlug = (id: string) =>
  id
    .replace(/\.(md|mdx)$/, '')
    .split('/')
    .at(-1) ?? id;

export async function getInterests() {
  return (await getCollection('interests', ({ data }) => !data.draft)).sort(
    (left, right) => right.data.date.getTime() - left.data.date.getTime(),
  );
}

export async function getLearningEntries() {
  return (await getCollection('learning', ({ data }) => !data.draft)).sort(
    (left, right) => right.data.date.getTime() - left.data.date.getTime(),
  );
}

export async function getBlogPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
}

export const toInterestItem = (
  entry: CollectionEntry<'interests'>,
): InterestItem => {
  const slug = entrySlug(entry.id);

  return {
    slug,
    title: entry.data.title,
    summary: entry.data.summary,
    category: entry.data.category,
    status: entry.data.status,
    cover: entry.data.cover,
    date: entry.data.date.toISOString(),
  };
};
