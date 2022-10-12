import { renderHook } from "@testing-library/react";
import { useTimeout } from "../src/use-timeout";

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => jest.clearAllTimers());

describe("useTimeout", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = jest.spyOn(window, "setTimeout");
    const clearTimeout = jest.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() => useTimeout(jest.fn()));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it("calls the effect after the timeout", () => {
    const effect = jest.fn();

    renderHook(() => useTimeout(effect));
    expect(effect).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
