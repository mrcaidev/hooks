import { renderHook } from "@testing-library/react";
import { useUnmount } from "../src/use-unmount";

describe("useUnmount", () => {
  it("only runs on unmount", () => {
    const cleanup = jest.fn();

    // Mount.
    const { rerender, unmount } = renderHook(() => useUnmount(cleanup));
    expect(cleanup).toHaveBeenCalledTimes(0);

    // Update.
    rerender();
    expect(cleanup).toHaveBeenCalledTimes(0);

    // Unmount.
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
