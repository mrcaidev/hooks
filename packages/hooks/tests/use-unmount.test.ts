import { renderHook } from "@testing-library/react";
import { useUnmount } from "src/use-unmount";

describe("useUnmount", () => {
  it("only runs on unmount", () => {
    const cleanup = vi.fn();

    const { rerender, unmount } = renderHook(() => useUnmount(cleanup));
    expect(cleanup).toHaveBeenCalledTimes(0);

    rerender();
    expect(cleanup).toHaveBeenCalledTimes(0);

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
