import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "../src/use-media-query";

const addEventListener = jest.fn();
const removeEventListener = jest.fn();

beforeAll(() => {
  // Mock device environment: Dark preferred.
  const device: Record<string, boolean> = {
    "(prefers-color-scheme: dark)": true,
  };

  // Mock `window.matchMedia`.
  window.matchMedia = (query: string) =>
    ({
      matches: device[query] ?? false,
      addEventListener,
      removeEventListener,
    } as any as MediaQueryList);
});

describe("useMediaQuery", () => {
  it("correctly sets up and tears down", () => {
    const { result, unmount } = renderHook(() => useMediaQuery(""));
    expect(result.current).toEqual(false);
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("returns true if matched", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: dark)")
    );
    expect(result.current).toEqual(true);
  });

  it("returns false if unmatched", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: light)")
    );
    expect(result.current).toEqual(false);
  });
});
