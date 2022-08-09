import { renderHook } from "@testing-library/react";
import { useDebounce } from "../src/use-debounce";

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(() => jest.clearAllTimers());

describe("useDebounce", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = jest.spyOn(window, "setTimeout");
    const clearTimeout = jest.spyOn(window, "clearTimeout");

    const { result, unmount } = renderHook(() => useDebounce(0));
    expect(result.current).toBe(0);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
    expect(clearTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
