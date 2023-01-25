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

it("triggers effect after timeout", () => {
  const effect = vi.fn();

  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    useDebounceEffect(effect, [count]);
    return { count, increment };
  });
  expect(effect).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});

it("triggers effect only once after multiple changes", () => {
  const effect = vi.fn();

  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    useDebounceEffect(effect, [count]);
    return { count, increment };
  });
  expect(effect).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});

it("can customize timeout", () => {
  const effect = vi.fn();

  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    useDebounceEffect(effect, [count], { timeout: 100 });
    return { count, increment };
  });
  expect(effect).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});

it("can start timing on mount", () => {
  const effect = vi.fn();

  renderHook(() => useDebounceEffect(effect, [], { onMount: true }));
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});
