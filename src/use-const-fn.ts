import { useConst } from "./use-const";

/**
 * Use a constant function.
 * @param fn - A function to be made constant.
 * @returns A constant function.
 */
export function useConstFn<T extends (...args: any) => any>(fn: T) {
  return useConst(() => fn);
}
