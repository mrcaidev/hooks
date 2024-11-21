# useDebounceEffect

Debounce an effect.

```ts
useDebounceEffect(
  () => {
    doSomething();
  },
  [],
  { timeout: 1000 },
);
```

## Parameters

### effect

- Type: `EffectCallback`

The effect to be debounced.

### deps

- Type: `DependencyList`
- Default: `undefined`

The dependencies of the effect, just like in `useEffect`.

### options

- Type: `UseDebounceEffectOptions`
- Default: `{}`

The options to configure the hook.

## Options

### timeout

- Type: `number`
- Default: 500

The time in milliseconds between the last call of the effect and the actual execution.

Changes of this value will clear the current timer (with the old `timeout` value) and start a new one (with the new `timeout` value).

### onMount

- Type: `boolean`
- Default: `false`

Whether to immediately call the effect and trigger the debouncing mechanism when the hook is mounted.
