import { renderHook } from "@testing-library/react";
import { useMount } from "../src/use-mount";

describe("useMount", () => {
  it("only runs on mount", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);

    // Mount.
    const { rerender, unmount } = renderHook(() => useMount(effect));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(0);

    // Update.
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(0);

    // Unmount.
    unmount();
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
