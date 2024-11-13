import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import ts from "typescript-eslint";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    ignores: [
      "coverage",
      "dist",
      "docs/.vitepress/cache",
      "docs/.vitepress/dist",
    ],
  },
);
