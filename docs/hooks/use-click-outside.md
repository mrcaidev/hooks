# useClickOutside

Listen to click events outside of a node.

```ts
const modalRef = useRef<HTMLDivElement>(null);

useClickOutside(modalRef, () => closeModal());
```

## Parameters

### ref

- Type: `RefObject<Node>`

The ref of the node to listen for click events outside of.

### callback

- Type: `(event: MouseEvent, target: Node) => void`

The function to call when a click event occurs outside of the node.

The first argument is the click event, and the second argument is the target node contained inside the `ref`.
