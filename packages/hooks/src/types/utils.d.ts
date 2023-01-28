// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn = (...args: any) => any;

export type Async<T extends Fn> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;
