import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "src/use-media-query";

it("returns true if matched", () => {
  const { result } = renderHook(() => useMediaQuery("(max-width: 1200px)"));
  expect(result.current).toEqual(true);
});

it("returns false if unmatched", () => {
  const { result } = renderHook(() => useMediaQuery("(max-width: 640px)"));
  expect(result.current).toEqual(false);
});

it("responds to stateful query string", () => {
  const { result, rerender } = renderHook((query) => useMediaQuery(query), {
    initialProps: "max-width: 1200px",
  });
  expect(result.current).toEqual(true);

  rerender("max-width: 640px");
  expect(result.current).toEqual(false);
});
