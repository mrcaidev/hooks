# useClipboardText

Use the text on the user's clipboard.

```ts
const { text, error, write } = useClipboardText();
```

## Parameters

### options

- Type: `UseClipboardTextOptions`
- Default: `{}`

The options to configure the hook.

## Options

### readOnMount

- Type: boolean
- Default: `true`

Whether to immediately read the user's clipboard when the hook is mounted.

If set to `false`, the returned `text` will be its default value, that is, `""`.

When this option is changed from `false` to `true`, the hook will read the user's clipboard.

## Returns

### text

- Type: `string`
- Default: `""`

The text on the user's clipboard.

### error

- Type: `Error | null`
- Default: `null`

The error that occurs while reading from or writing to the user's clipboard.

After any successful read or write operation, `error` will be reset to `null`.

### write

- Type: `(text: string) => Promise<void>`

Write text to the user's clipboard.
