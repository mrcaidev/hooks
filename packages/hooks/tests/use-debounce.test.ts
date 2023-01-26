import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("updates value only once after continuous updates", () => {
  const { result, rerender } = renderHook((count) => useDebounce(count), {
    initialProps: 0,
  });
  expect(result.current).toEqual(0);

  rerender(1);
  vi.advanceTimersByTime(499);
  rerender(2);
  vi.advanceTimersByTime(499);
  rerender(3);
  vi.advanceTimersByTime(499);
  expect(result.current).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current).toEqual(3);
});

it("can customize timeout", () => {
  const { result, rerender } = renderHook(
    (count) => useDebounce(count, { timeout: 100 }),
    { initialProps: 0 }
  );
  expect(result.current).toEqual(0);

  rerender(1);
  vi.advanceTimersByTime(99);
  rerender(2);
  vi.advanceTimersByTime(99);
  rerender(3);
  vi.advanceTimersByTime(99);
  expect(result.current).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current).toEqual(3);
});

it("can start timing on mount", () => {
  const { result } = renderHook(
    (count) => useDebounce(count, { timeout: 100 }),
    { initialProps: 0 }
  );
  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(499);
  expect(result.current).toEqual(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current).toEqual(0);
});
