import { renderHook } from "@testing-library/react";
import { useConstFn } from "src";

it("memoizes the function across re-renders", () => {
  const fn = vi.fn();

  const { result, rerender } = renderHook(() => useConstFn(fn));

  expect(result.current).toEqual(fn);

  rerender();

  expect(result.current).toEqual(fn);
});
