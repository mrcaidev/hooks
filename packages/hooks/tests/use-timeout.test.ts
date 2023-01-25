import { renderHook } from "@testing-library/react";
import { useTimeout } from "src/use-timeout";

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

  renderHook(() => useTimeout(effect));
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});

it("can customize timeout", () => {
  const effect = vi.fn();

  renderHook(() => useTimeout(effect, 100));
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});
