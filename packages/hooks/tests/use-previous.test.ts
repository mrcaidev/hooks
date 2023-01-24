import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { usePrevious } from "src/use-previous";

describe("usePrevious", () => {
  it("can save previous state", () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const increment = () => setCount((count) => count + 1);

      const previousCountRef = usePrevious(count);
      return { previousCountRef, count, increment };
    });

    expect(result.current.count).toEqual(0);
    expect(result.current.previousCountRef.current).toEqual(undefined);

    act(() => result.current.increment());
    expect(result.current.count).toEqual(1);
    expect(result.current.previousCountRef.current).toEqual(0);

    act(() => result.current.increment());
    expect(result.current.count).toEqual(2);
    expect(result.current.previousCountRef.current).toEqual(1);
  });

  it("can customize shouldUpdate", () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const increment = () => setCount((count) => count + 1);

      const previousCountRef = usePrevious(count, () => false);
      return { previousCountRef, count, increment };
    });

    expect(result.current.count).toEqual(0);
    expect(result.current.previousCountRef.current).toEqual(undefined);

    act(() => result.current.increment());
    expect(result.current.count).toEqual(1);
    expect(result.current.previousCountRef.current).toEqual(undefined);

    act(() => result.current.increment());
    expect(result.current.count).toEqual(2);
    expect(result.current.previousCountRef.current).toEqual(undefined);
  });
});
