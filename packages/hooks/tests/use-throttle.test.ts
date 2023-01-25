import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useThrottle } from "src/use-throttle";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("updates value only once in a period", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const throttledCount = useThrottle(count);
    return { throttledCount, increment };
  });
  expect(result.current.throttledCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(1);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(1);

  vi.advanceTimersByTime(500);
  expect(result.current.throttledCount).toEqual(1);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(3);
});

it("can customize timeout", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const throttledCount = useThrottle(count, { timeout: 100 });
    return { throttledCount, increment };
  });
  expect(result.current.throttledCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(1);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(1);

  vi.advanceTimersByTime(100);
  expect(result.current.throttledCount).toEqual(1);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(3);
});

it("can start timing on mount", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const throttledCount = useThrottle(count, { onMount: true });
    return { throttledCount, increment };
  });
  expect(result.current.throttledCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(0);

  vi.advanceTimersByTime(500);
  expect(result.current.throttledCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.throttledCount).toEqual(2);
});
