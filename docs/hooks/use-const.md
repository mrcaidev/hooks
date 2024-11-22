# useConst

Memoize a value, which stays the same across rerenders.

```ts
const value = useConst(() => expensiveCompute());
```

## Parameters

### factory

- Type: `() => T`

A function that computes the value to be memoized.

## Returns

- Type: `T`

The memoized value.
