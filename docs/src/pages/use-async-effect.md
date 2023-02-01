---
description: The same as useEffect, but for async functions.
---

# useAsyncEffect

The same as `useEffect`, but for async functions.

## Signature

```ts
useAsyncEffect(effect: () => Promise<void>, deps?: unknown[]): void;
```

## Parameters

### effect

An async function, such as data fetching, subscriptions and timers.

Cleanup function is currently not supported.

### deps

Dependencies of effect. The function will be executed every time one of the dependencies changes.

Default: `undefined`

## Example

```tsx
import { useState } from "react";
import { useAsyncEffect } from "@mrcaidev/hooks";

export function Component() {
  const [message, setMessage] = useState("");

  useAsyncEffect(async () => {
    const data = await fetch("https://example.com");
    const json = await data.json();
    setMessage(json.message);
  }, []);

  return <p>{message}</p>;
}
```
