import { defineConfig } from "vitepress";

export default defineConfig({
  title: "@mrcaidev/hooks",
  description: "React utility hooks",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/logo.svg",
      },
    ],
  ],
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      {
        text: "Docs",
        link: "/introduction/getting-started",
      },
      {
        text: "Playground",
        link: "https://codesandbox.io/p/sandbox/thirsty-chaum-9oplqq",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        base: "/introduction",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mrcaidev/hooks",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "© 2022-present Yuwang Cai",
    },
    editLink: {
      pattern: "https://github.com/mrcaidev/hooks/edit/main/docs/:path",
    },
    search: {
      provider: "local",
    },
  },
});
