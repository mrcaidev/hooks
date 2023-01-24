import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useThrottleEffect } from "src/use-throttle-effect";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

describe("useThrottleEffect", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = vi.spyOn(window, "setTimeout");

    const { unmount } = renderHook(() => useThrottleEffect(vi.fn()));
    expect(setTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(0);
  });

  it("defaults to 500ms, not on mount", () => {
    const effect = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useThrottleEffect(effect, [count]);
      return { setCount };
    });
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("can specify timeout", () => {
    const effect = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useThrottleEffect(effect, [count], { timeout: 100 });
      return { setCount };
    });
    expect(effect).toHaveBeenCalledTimes(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("can run on mount", () => {
    const effect = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useThrottleEffect(effect, [count], { onMount: true });
      return { setCount };
    });
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
