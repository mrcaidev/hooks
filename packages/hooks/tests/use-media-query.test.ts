import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "src/use-media-query";

// TODO: Use width query to test this hook.

beforeAll(() => {
  const device: Record<string, boolean> = {
    "(prefers-color-scheme: dark)": true,
  };

  window.matchMedia = (query: string) =>
    ({
      matches: device[query] ?? false,
      addEventListener: () => 0,
      removeEventListener: () => 0,
    } as unknown as MediaQueryList);
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

it("responds to media query changes", () => {
  const { result, rerender } = renderHook((query) => useMediaQuery(query), {
    initialProps: "(prefers-color-scheme: dark)",
  });
  expect(result.current).toEqual(true);

  rerender("(prefers-color-scheme: light)");
  expect(result.current).toEqual(false);
});
