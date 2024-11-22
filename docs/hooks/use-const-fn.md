# useConstFn

Memoize a function, which stays the same across rerenders.

```ts
const fn = useConstFn(() => {
  doSomething();
});
```

## Parameters

### fn

- Type: `Function`

The function to memoize.

## Returns

- Type: `Function`

The memoized function.
