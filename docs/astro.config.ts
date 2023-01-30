import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { autolinkHeadings } from "./src/plugins/autolink-headings";
import { injectFrontmatter } from "./src/plugins/inject-frontmatter";

export default defineConfig({
  integrations: [
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [injectFrontmatter],
    rehypePlugins: [rehypeHeadingIds, autolinkHeadings],
  },
  site: "https://hooks.mrcai.dev",
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
