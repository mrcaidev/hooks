# useCounter

Use a counter.

```ts
const { count, set, increment, decrement, incrementBy, decrementBy, reset } =
  useCounter();
```

## Parameters

### initialCount

- Type: `number`
- Default: 0

The initial value of the counter.

## Returns

### count

- Type: `number`

The current value of the counter.

### set

- Type: `Dispatch<SetStateAction<number>>`

Set the count to any number.

### increment

- Type: `() => void`

Increment the count by 1.

### decrement

- Type: `() => void`

Decrement the count by 1.

### incrementBy

- Type: `(delta: number) => void`

Increment the count by a specified amount.

### decrementBy

- Type: `(delta: number) => void`

Decrement the count by a specified amount.

### reset

- Type: `() => void`

Reset the count to the initial count.
