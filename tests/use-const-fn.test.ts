import { renderHook } from "@testing-library/react";
import { useConstFn } from "../src/use-const-fn";

describe("useConstFn", () => {
  it("sets up correctly", () => {
    const { result } = renderHook(() => useConstFn(() => 1));
    expect(result.current()).toEqual(1);
  });

  it("stays the same across re-renders", () => {
    const targetFn = jest.fn();

    const { result, rerender } = renderHook(() => useConstFn(targetFn));
    expect(result.current).toEqual(targetFn);

    rerender();
    expect(result.current).toEqual(targetFn);
  });
});
