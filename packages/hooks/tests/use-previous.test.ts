import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { usePrevious } from "src/use-previous";

it("saves previous state", () => {
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

it("can customize equal function", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);

    const previousCountRef = usePrevious(count, () => true);
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
