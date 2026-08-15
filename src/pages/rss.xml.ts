import rss from '@astrojs/rss';
import { site } from '../data/site';
import { entrySlug, getBlogPosts } from '../lib/content';

export async function GET(context: { site?: URL }) {
  const posts = await getBlogPosts();

  return rss({
    title: `${site.shortName} / transmissions`,
    description: site.description,
    site: context.site ?? 'https://akshoofie.vercel.app',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${entrySlug(post.id)}`,
      categories: post.data.tags,
    })),
  });
}
