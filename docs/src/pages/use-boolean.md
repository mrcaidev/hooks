---
description: Use a boolean value.
---

# useBoolean

Use a boolean value.

Useful when managing the opening and closing of modals, drawers, etc.

## Signature

```ts
useBoolean(defaultValue?: boolean): {
  value: boolean;
  set: (value: boolean) => void;
  toggle: () => void;
  on: () => void;
  off: () => void;
};
```

## Parameters

### defaultValue

The initial boolean value.

Default: `false`

## Returns

### value

The stateful boolean value.

### set

Set value to either `true` or `false`.

### toggle

Toggle value between `true` and `false`.

### on

Set value to `true`.

### off

Set value to `false`.

### Example

```tsx
import { useBoolean } from "@mrcaidev/hooks";

export function Component() {
  const { value, toggle } = useBoolean();

  return <button onClick={toggle}>{value ? "On" : "Off"}</button>;
}
```
