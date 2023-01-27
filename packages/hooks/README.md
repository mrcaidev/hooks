<div align="center">
  <a href="#">
    <img src="docs/public/reactjs.svg" alt="Logo" width="80">
  </a>
  <h1>@mrcaidev/hooks</h1>
  <p>React utility hooks</p>
  <p>
    <strong><a href="https://hooks.mrcai.dev">🔍 Explore the docs 📖</a></strong>
  </p>
</div>

## ✨ Introduction

**@mrcaidev/hooks** is a collection of useful React hooks.

- **Highly customizable:** Good defaults, with easy customization.
- **100% in TypeScript:** Unleash the full power of typing system.
- **Ready for SSG/SSR:** Works on both server and browser.
- **Tiny and treeshakable**: <3KB gzipped. Tree-shaking supported.

## 🚀 Getting started

`@mrcaidev/hooks` is available in npm registry.

```sh
npm i @mrcaidev/hooks     # Use npm
yarn add @mrcaidev/hooks  # Use yarn
pnpm add @mrcaidev/hooks  # Use pnpm
```

And then import the hook you want to use:

```ts
import { useBoolean } from "@mrcaidev/hooks";

const Component = () => {
  const { value, toggle } = useBoolean();
  return ...;
};
```

Please see the [documentation](https://hooks.mrcai.dev) for more information.

## 🧰 Built with

[![TypeScript](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-23272f?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vitest](https://img.shields.io/badge/vitest-6da13f?style=for-the-badge&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![Testing Library](https://shields.io/badge/testing%20library-e33433?style=for-the-badge&logo=testinglibrary&logoColor=ffffff)](https://testing-library.com/)
[![pnpm](https://img.shields.io/badge/pnpm-f69220?style=for-the-badge&logo=pnpm&logoColor=ffffff)](https://pnpm.io/)
[![Vite](https://img.shields.io/badge/vite-646cff?style=for-the-badge&logo=vite&logoColor=ffffff)](https://vitejs.dev/)
[![Turborepo](https://img.shields.io/badge/turborepo-000000?style=for-the-badge&logo=turborepo)](https://turbo.build/repo)
[![ESLint](https://shields.io/badge/eslint-4b32c3?style=for-the-badge&logo=eslint&logoColor=ffffff)](https://eslint.org/)
[![Prettier](https://shields.io/badge/prettier-24292e?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![Commitlint](https://shields.io/badge/commitlint-121212?style=for-the-badge&logo=commitlint&logoColor=ffffff)](https://commitlint.js.org/#/)
[![EditorConfig](https://shields.io/badge/editorconfig-000?style=for-the-badge&logo=editorconfig&logoColor=ffffff)](https://editorconfig.org/)
[![Husky](https://shields.io/badge/husky-42b983?style=for-the-badge&logo=git&logoColor=ffffff)](https://typicode.github.io/husky/#/)
[![Lint staged](https://shields.io/badge/lint%20staged-f54d27?style=for-the-badge&logo=git&logoColor=ffffff)](https://github.com/okonet/lint-staged#readme)

## 📜 License

[MIT](https://github.com/mrcaidev/hooks/tree/master/LICENSE)
