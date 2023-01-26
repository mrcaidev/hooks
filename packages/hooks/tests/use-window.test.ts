import { renderHook } from "@testing-library/react";
import { useWindow } from "src/use-window";

it("returns window", () => {
  const { result } = renderHook(() => useWindow());
  expect(result.current.current).toEqual(window);
});
