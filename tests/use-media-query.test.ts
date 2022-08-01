import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "../src/use-media-query";

beforeAll(() => {
  // Mock device environment: Dark preferred.
  const device: Record<string, boolean> = {
    "(prefers-color-scheme: dark)": true,
  };

  // Mock `window.matchMedia`.
  window.matchMedia = (query: string) =>
    ({
      matches: device[query] ?? false,
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any as MediaQueryList);
});

describe("useMediaQuery", () => {
  it("returns false if unmatched", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: light)")
    );
    expect(result.current).toEqual(false);
  });

  it("returns true if matched", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: dark)")
    );
    expect(result.current).toEqual(true);
  });
});
