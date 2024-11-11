import { renderHook } from "@testing-library/react";
import { useConstFn } from "src";

it("remembers the function", () => {
  const { result } = renderHook(() => useConstFn(() => 1));
  expect(result.current()).toEqual(1);
});

it("stays the same across re-renders", () => {
  const fn = vi.fn();

  const { result, rerender } = renderHook(() => useConstFn(fn));
  expect(result.current).toEqual(fn);

  rerender();
  expect(result.current).toEqual(fn);
});
