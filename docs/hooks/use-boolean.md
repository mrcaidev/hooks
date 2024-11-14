# useBoolean

Use a boolean value.

```ts
const { value, set, setTrue, setFalse, toggle, reset } = useBoolean();
```

## Parameters

### initialValue

- Type: `boolean`
- Default: `false`

The initial value of the boolean.

## Returns

### value

- Type: `boolean`

The current value of the boolean.

### set

- Type: `Dispatch<SetStateAction<boolean>>`

Set the value to any boolean.

### setTrue

- Type: `() => void`

Set the value to `true`.

### setFalse

- Type: `() => void`

Set the value to `false`.

### toggle

- Type: `() => void`

Toggle the value, that is, to set the value to `true` if it is currently `false`, and to `false` if it is currently `true`.

### reset

- Type: `() => void`

Reset the value to the initial value.
