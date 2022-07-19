import { useConst } from "./use-const";

/**
 * Use a memorized function.
 *
 * @param fn - The function to memorize.
 * @returns Memorized function.
 *
 * @public
 */
export function useConstFn<T extends (...args: any) => any>(fn: T): T {
  return useConst(() => fn);
}
