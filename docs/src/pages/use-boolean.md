---
title: useBoolean
description: Use a boolean value.
createdAt: 2022/9/27
updatedAt: 2022/9/27
layout: layouts/DocLayout.astro
---

Use a boolean value.

Useful when managing states of modals, drawer, etc.

## Signature

```ts
const { value, set, toggle, on, off } = useBoolean(initialValue?: boolean)
```

## Parameters

|   Property   |   Type    | Default |      Description       |
| :----------: | :-------: | :-----: | :--------------------: |
| initialValue | `boolean` | `false` | Initial boolean value. |

## Result

| Property |            Type            |       Description       |
| :------: | :------------------------: | :---------------------: |
|  value   |         `boolean`          |   The boolean value.    |
|   set    | `(value: boolean) => void` | Set to arbitrary value. |
|  toggle  |        `() => void`        |      Toggle value.      |
|    on    |        `() => void`        |      Set to true.       |
|   off    |        `() => void`        |      Set to false.      |