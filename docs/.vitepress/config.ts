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
      {
        text: "Hooks",
        base: "/hooks",
        items: [
          {
            text: "useAsyncEffect",
            link: "/use-async-effect",
          },
          {
            text: "useBoolean",
            link: "/use-boolean",
          },
          {
            text: "useClickOutside",
            link: "/use-click-outside",
          },
          {
            text: "useClipboardText",
            link: "/use-clipboard-text",
          },
          {
            text: "useConstFn",
            link: "/use-const-fn",
          },
          {
            text: "useConst",
            link: "/use-const",
          },
          {
            text: "useCounter",
            link: "/use-counter",
          },
          {
            text: "useDebounceEffect",
            link: "/use-debounce-effect",
          },
          {
            text: "useDebounce",
            link: "/use-debounce",
          },
          {
            text: "useDocumentEventListener",
            link: "/use-document-event-listener",
          },
          {
            text: "useDocument",
            link: "/use-document",
          },
          {
            text: "useElementSize",
            link: "/use-element-size",
          },
          {
            text: "useEventListener",
            link: "/use-event-listener",
          },
          {
            text: "useFocusTrap",
            link: "/use-focus-trap",
          },
          {
            text: "useHover",
            link: "/use-hover",
          },
          {
            text: "useInterval",
            link: "/use-interval",
          },
          {
            text: "useIsMounted",
            link: "/use-is-mounted",
          },
          {
            text: "useKeydown",
            link: "/use-keydown",
          },
          {
            text: "useLatest",
            link: "/use-latest",
          },
          {
            text: "useLocalStorage",
            link: "/use-local-storage",
          },
          {
            text: "useMediaQuery",
            link: "/use-media-query",
          },
          {
            text: "useMount",
            link: "/use-mount",
          },
          {
            text: "usePrevious",
            link: "/use-previous",
          },
          {
            text: "useRerender",
            link: "/use-rerender",
          },
          {
            text: "useSafeLayoutEffect",
            link: "/use-safe-layout-effect",
          },
          {
            text: "useSessionStorage",
            link: "/use-session-storage",
          },
          {
            text: "useTextSelection",
            link: "/use-text-selection",
          },
          {
            text: "useTheme",
            link: "/use-theme",
          },
          {
            text: "useThrottleEffect",
            link: "/use-throttle-effect",
          },
          {
            text: "useThrottle",
            link: "/use-throttle",
          },
          {
            text: "useTimeout",
            link: "/use-timeout",
          },
          {
            text: "useTitle",
            link: "/use-title",
          },
          {
            text: "useToggle",
            link: "/use-toggle",
          },
          {
            text: "useUnmount",
            link: "/use-unmount",
          },
          {
            text: "useUnsafeOnceEffect",
            link: "/use-unsafe-once-effect",
          },
          {
            text: "useUpdate",
            link: "/use-update",
          },
          {
            text: "useWindowSize",
            link: "/use-window-size",
          },
          {
            text: "useWindow",
            link: "/use-window",
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
