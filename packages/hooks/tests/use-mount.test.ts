import { renderHook } from "@testing-library/react";
import { useMount } from "src/use-mount";

describe("useMount", () => {
  it("only runs on mount", () => {
    const cleanup = vi.fn();
    const effect = vi.fn();

    const { rerender, unmount } = renderHook(() =>
      useMount(() => {
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
