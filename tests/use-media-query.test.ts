import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "src";

const mockMatchMedia = vi.fn();

const commonReturnValue = {
  addEventListener: () => {},
  removeEventListener: () => {},
};

beforeAll(() => {
  window.innerWidth = 1024;
  vi.stubGlobal("matchMedia", mockMatchMedia);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

it("returns `true` if matched", () => {
  mockMatchMedia.mockReturnValueOnce({ matches: true, ...commonReturnValue });

  const { result } = renderHook(() => useMediaQuery("(max-width: 1280px)"));

  expect(result.current).toEqual(true);
});

it("returns `false` if not matched", () => {
  mockMatchMedia.mockReturnValueOnce({ matches: false, ...commonReturnValue });

  const { result } = renderHook(() => useMediaQuery("(max-width: 640px)"));

  expect(result.current).toEqual(false);
});

it("responds to dynamic `query`", () => {
  mockMatchMedia.mockReturnValueOnce({ matches: true, ...commonReturnValue });

  const { result, rerender } = renderHook((query) => useMediaQuery(query), {
    initialProps: "max-width: 1280px",
  });

  expect(result.current).toEqual(true);

  mockMatchMedia.mockReturnValueOnce({ matches: false, ...commonReturnValue });

  rerender("max-width: 640px");

  expect(result.current).toEqual(false);
});
