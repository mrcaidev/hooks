import { renderHook } from "@testing-library/react";
import { useIsMounted } from "src/use-is-mounted";

describe("useIsMounted", () => {
  it("returns true on mount", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current.current).toEqual(true);
  });

  it("returns true on update", () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    rerender();
    expect(result.current.current).toEqual(true);
  });

  it("returns false on unmount", () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    unmount();
    expect(result.current.current).toEqual(false);
  });
});
