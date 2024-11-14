import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

it("updates value only once after multiple updates", () => {
  const { result, rerender } = renderHook((count) => useDebounce(count), {
    initialProps: 0,
  });

  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(500);

  expect(result.current).toEqual(0);

  rerender(1);
  vi.advanceTimersByTime(499);
  rerender(2);
  vi.advanceTimersByTime(499);
  rerender(3);
  vi.advanceTimersByTime(499);

  expect(result.current).toEqual(0);

  act(() => vi.advanceTimersByTime(1));

  expect(result.current).toEqual(3);
});

it("can customize timeout", () => {
  const { result, rerender } = renderHook(
    (count) => useDebounce(count, { timeout: 100 }),
    { initialProps: 0 },
  );

  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(100);

  expect(result.current).toEqual(0);

  rerender(1);
  vi.advanceTimersByTime(99);
  rerender(2);
  vi.advanceTimersByTime(99);
  rerender(3);
  vi.advanceTimersByTime(99);

  expect(result.current).toEqual(0);

  act(() => vi.advanceTimersByTime(1));

  expect(result.current).toEqual(3);
});

it("responds to dynamic `timeout`", () => {
  const { result, rerender } = renderHook(
    ({ count, timeout }) => useDebounce(count, { timeout }),
    { initialProps: { count: 0, timeout: 500 } },
  );

  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(500);

  expect(result.current).toEqual(0);

  rerender({ count: 1, timeout: 500 });
  vi.advanceTimersByTime(499);
  rerender({ count: 1, timeout: 100 });
  vi.advanceTimersByTime(1);

  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(98);

  expect(result.current).toEqual(0);

  act(() => vi.advanceTimersByTime(1));

  expect(result.current).toEqual(1);
});

it("can run on mount", () => {
  const { result } = renderHook(
    (count) => useDebounce(count, { onMount: true }),
    { initialProps: 0 },
  );

  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(499);

  expect(result.current).toEqual(0);

  act(() => vi.advanceTimersByTime(1));

  expect(result.current).toEqual(0);
});
