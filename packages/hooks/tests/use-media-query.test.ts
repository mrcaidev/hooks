import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "src/use-media-query";
import { matchMedia } from "./utils/match-media";

beforeAll(() => {
  vi.stubGlobal("matchMedia", matchMedia);
});
afterAll(() => {
  vi.unstubAllGlobals();
});
beforeEach(() => {
  window.innerWidth = 1024;
});

it("returns true if matched", () => {
  const { result } = renderHook(() => useMediaQuery("(max-width: 1280px)"));
  expect(result.current).toEqual(true);
});

it("returns false if not matched", () => {
  const { result } = renderHook(() => useMediaQuery("(max-width: 640px)"));
  expect(result.current).toEqual(false);
});

it("responds to stateful query", () => {
  const { result, rerender } = renderHook((query) => useMediaQuery(query), {
    initialProps: "max-width: 1280px",
  });
  expect(result.current).toEqual(true);

  rerender("max-width: 640px");
  expect(result.current).toEqual(false);
});
