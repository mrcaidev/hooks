import type { RemarkPlugin } from "@astrojs/markdown-remark";

export const injectFrontmatter: RemarkPlugin = () => {
  return (_, { data }) => {
    (data.astro as any).frontmatter.layout = "layouts/doc-layout.astro";
  };
};
