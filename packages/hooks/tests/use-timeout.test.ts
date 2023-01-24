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

describe("useTimeout", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = vi.spyOn(window, "setTimeout");
    const clearTimeout = vi.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() => useTimeout(vi.fn()));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it("calls the effect after the timeout", () => {
    const effect = vi.fn();

    renderHook(() => useTimeout(effect));
    expect(effect).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
