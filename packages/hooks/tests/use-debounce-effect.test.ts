import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useDebounceEffect } from "src/use-debounce-effect";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

describe("useDebounceEffect", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = vi.spyOn(window, "setTimeout");
    const clearTimeout = vi.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() => useDebounceEffect(vi.fn()));
    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(clearTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(clearTimeout).toHaveBeenCalledTimes(0);
  });

  it("defaults to 500ms, not on mount", () => {
    const effect = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useDebounceEffect(effect, [count]);
      return { count, setCount };
    });
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(499);
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(1);
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("can specify timeout", () => {
    const effect = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useDebounceEffect(effect, [count], { timeout: 100 });
      return { count, setCount };
    });
    expect(effect).toHaveBeenCalledTimes(0);

    act(() => result.current.setCount((count) => count + 1));
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(100);
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("can run on mount", () => {
    const effect = vi.fn();

    renderHook(() => useDebounceEffect(effect, [], { onMount: true }));
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
