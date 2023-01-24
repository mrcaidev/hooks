import { renderHook } from "@testing-library/react";
import { useInterval } from "src/use-interval";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

describe("useInterval", () => {
  it("correctly sets up and tears down", () => {
    const setInterval = vi.spyOn(window, "setInterval");
    const clearInterval = vi.spyOn(window, "clearInterval");

    const { unmount } = renderHook(() => useInterval(vi.fn()));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(0);

    unmount();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it("calls the effect after each timeout", () => {
    const effect = vi.fn();

    renderHook(() => useInterval(effect));
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(2);
  });
});
