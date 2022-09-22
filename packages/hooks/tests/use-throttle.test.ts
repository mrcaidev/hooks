import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useThrottle } from "../src/use-throttle";

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => jest.clearAllTimers());

describe("useThrottle", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = jest.spyOn(window, "setTimeout");

    const { result, unmount } = renderHook(() => useThrottle(0));
    expect(result.current).toEqual(0);
    expect(setTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(0);
  });

  it("defaults to 500ms, not on mount", () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const throttledCount = useThrottle(count);
      return { count, throttledCount, setCount };
    });
    expect(result.current.throttledCount).toEqual(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(1);

    jest.advanceTimersByTime(499);
    expect(result.current.throttledCount).toEqual(1);

    jest.advanceTimersByTime(1);
    expect(result.current.throttledCount).toEqual(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(3);
  });

  it("can specify timeout", () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const throttledCount = useThrottle(count, { timeout: 100 });
      return { count, throttledCount, setCount };
    });
    expect(result.current.throttledCount).toEqual(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(1);

    jest.advanceTimersByTime(100);
    expect(result.current.throttledCount).toEqual(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(3);
  });

  it("can run on mount", () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const throttledCount = useThrottle(count, { onMount: true });
      return { count, throttledCount, setCount };
    });
    expect(result.current.throttledCount).toEqual(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(0);

    jest.advanceTimersByTime(500);
    expect(result.current.throttledCount).toEqual(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(result.current.throttledCount).toEqual(2);
  });
});
