import { renderHook } from "@testing-library/react";
import { useInterval } from "../src/use-interval";

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => jest.clearAllTimers());

describe("useInterval", () => {
  it("correctly sets up and tears down", () => {
    const setInterval = jest.spyOn(window, "setInterval");
    const clearInterval = jest.spyOn(window, "clearInterval");

    const { unmount } = renderHook(() => useInterval(jest.fn()));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(0);

    unmount();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it("calls the effect after each timeout", () => {
    const effect = jest.fn();

    renderHook(() => useInterval(effect));
    expect(effect).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(effect).toHaveBeenCalledTimes(2);
  });
});
