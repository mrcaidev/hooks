import { renderHook } from "@testing-library/react";
import { useUnsafeOnceEffect } from "src/use-unsafe-once-effect";

describe("useUnsafeOnceEffect", () => {
  it("only runs once", () => {
    const cleanup = vi.fn();
    const effect = vi.fn();

    const { rerender, unmount } = renderHook(() =>
      useUnsafeOnceEffect(() => {
        effect();
        return cleanup;
      })
    );
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(0);

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(0);

    unmount();
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
