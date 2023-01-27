// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => any;

type Async<T extends Fn> = (...args: Parameters<T>) => Promise<ReturnType<T>>;
