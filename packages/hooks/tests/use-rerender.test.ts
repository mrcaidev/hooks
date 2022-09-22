import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { useRerender } from "../src/use-rerender";

describe("useRerender", () => {
  it("correctly sets up and tears down", () => {
    const { result } = renderHook(() => useRerender());
    expect(result.current).toBeInstanceOf(Function);
  });

  it("can force a re-render", () => {
    const effect = jest.fn();

    const { result } = renderHook(() => {
      useEffect(effect);
      return useRerender();
    });
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current());
    expect(effect).toHaveBeenCalledTimes(2);
  });
});
