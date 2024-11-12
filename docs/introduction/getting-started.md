# Getting Started

## Try It Online

You can try @mrcaidev/hooks directly in your browser on [CodeSandbox](https://codesandbox.io/p/sandbox/thirsty-chaum-9oplqq).

## Installation

### Prerequisites

[React](https://www.npmjs.com/package/react) and [React DOM](https://www.npmjs.com/package/react-dom) (version 16.8.0 or higher) are required.

For TypeScript users, you may also want to install [@types/react](https://www.npmjs.com/package/@types/react) and [@types/react-dom](https://www.npmjs.com/package/@types/react-dom).

### Install Package

::: code-group

```sh [npm]
npm add @mrcaidev/hooks
```

```sh [yarn]
yarn add @mrcaidev/hooks
```

```sh [pnpm]
pnpm add @mrcaidev/hooks
```

```sh [bun]
bun add @mrcaidev/hooks
```

:::

### Usage

```tsx
import { useBoolean } from "@mrcaidev/hooks";

function Component() {
  const { value, toggle } = useBoolean();

  return <button onClick={toggle}>{value ? "On" : "Off"}</button>;
}
```
