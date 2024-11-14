import { renderHook } from "@testing-library/react";
import { useIsMounted } from "src";

it("returns mount status", () => {
  const { result, rerender, unmount } = renderHook(() => useIsMounted());

  expect(result.current.current).toEqual(true);

  rerender();

  expect(result.current.current).toEqual(true);

  unmount();

  expect(result.current.current).toEqual(false);
});
