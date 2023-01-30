---
title: Installation
description: Install @mrcaidev/hooks in your project.
createdAt: 2022/9/27
updatedAt: 2022/9/27
---

# Installation

`@mrcaidev/hooks` is available in the npm registry. Use it with your favourite package manager!

## Installation

You should have [React](https://www.npmjs.com/package/react) installed beforehand.

```sh
npm i @mrcaidev/hooks     # npm
yarn add @mrcaidev/hooks  # yarn
pnpm add @mrcaidev/hooks  # pnpm
```

## Basic Usage

All hooks are named exports from this package.

```ts
import { useBoolean } from "@mrcaidev/hooks";

export function Component() {
  // Immediately start using hooks in your component,
  // with full typing support!
}
```
