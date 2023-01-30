import type { RehypePlugin } from "@astrojs/markdown-remark";
import { h } from "hastscript";
import type { Options } from "rehype-autolink-headings";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const options: Options = {
  group: () => h("div", { class: "group relative" }),
  behavior: "after",
  properties: { class: "absolute top-0 bottom-0 left-0 right-0" },
  content: () => [
    h(
      "span",
      {
        ariaHidden: "true",
        class:
          "hidden group-hover:inline absolute top-1/2 -left-5 -translate-y-1/2",
      },
      "#"
    ),
    h("span", { class: "sr-only" }, "This link goes to this heading"),
  ],
};

export const autolinkHeadings: [RehypePlugin, Options] = [
  rehypeAutolinkHeadings,
  options,
];
