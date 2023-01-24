import { renderHook } from "@testing-library/react";
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

describe("useDebounce", () => {
  it("correctly sets up and tears down", () => {
    const setTimeout = vi.spyOn(window, "setTimeout");
    const clearTimeout = vi.spyOn(window, "clearTimeout");

    const { result, unmount } = renderHook(() => useDebounce(0));
    expect(result.current).toEqual(0);
    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(clearTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(clearTimeout).toHaveBeenCalledTimes(0);
  });
});
