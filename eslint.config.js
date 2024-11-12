import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import ts from "typescript-eslint";

const flatCompat = new FlatCompat();

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...flatCompat.extends("plugin:react-hooks/recommended"),
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
