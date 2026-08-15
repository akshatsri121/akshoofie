# akshoofie

Akshat Srivastava's personal corner of the internet: media archive, learning workbench, blog, and assorted interests.

## Stack

- Astro with strict TypeScript
- React for the searchable collection explorer
- Markdown content collections with validated frontmatter
- Local Syne and JetBrains Mono variable fonts
- Vitest for content filtering tests
- Static output for Vercel

## Commands

```sh
npm install
npm run dev
npm test
npm run check
npm run build
```

## Add Content

Duplicate the corresponding `_template.md` file inside `src/content/interests`, `src/content/learning`, or `src/content/blog`. Give the new file a descriptive slug and change `draft` to `false` when it is ready to publish.

Long-form content is standard Markdown. Images should be placed under `public/images`, then referenced with a root-relative path such as `/images/covers/album.webp`.

Additional clean templates are available in `content-templates`.

## Collections

Interest categories are `anime`, `music`, `games`, `shows` and `movies`.

Learning entries support skills, projects, experiments, progress, source links, and live demo links. Blog posts automatically receive detail pages, article metadata, and RSS entries.

## Deploy

Import the repository into Vercel and use the detected Astro settings. Set `SITE_URL` to the production origin, then update the sitemap URL in `public/robots.txt` if the final domain differs from `akshoofie.vercel.app`.
