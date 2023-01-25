import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useDebounce } from "src/use-debounce";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("updates value after timeout", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const debouncedCount = useDebounce(count);
    return { debouncedCount, increment };
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(499);
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current.debouncedCount).toEqual(1);
});

it("updates value only once after multiple changes", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const debouncedCount = useDebounce(count);
    return { debouncedCount, increment };
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(499);
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(499);
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current.debouncedCount).toEqual(2);
});

it("can customize timeout", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const debouncedCount = useDebounce(count, { onMount: true });
    return { debouncedCount, increment };
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(499);
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current.debouncedCount).toEqual(1);
});

it("can start timing on mount", () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    const debouncedCount = useDebounce(count, { timeout: 100 });
    return { debouncedCount, increment };
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(99);
  });
  expect(result.current.debouncedCount).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current.debouncedCount).toEqual(1);
});
