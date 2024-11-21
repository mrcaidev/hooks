# useDebounce

Debounce a value.

```ts
const debouncedValue = useDebounce(value, { timeout: 1000 });
```

## Parameters

### value

- Type: `T`

The value to be debounced.

### options

- Type: `UseDebounceOptions<T>`
- Default: `{}`

The options to configure the hook.

## Options

### timeout

- Type: `number`
- Default: 500

The timeout in milliseconds between the last action of change and the actual time of that change being applied.

Changes of this value will clear the current timer (with the old `timeout` value) and start a new one (with the new `timeout` value).

### onMount

- Type: `boolean`
- Default: `false`

Whether to immediately start debouncing after the component is mounted.

## Returns

- Type: `T`

The debounced value.
