import { renderHook } from "@testing-library/react";
import { useUpdate } from "../src/use-update";

describe("useUpdate", () => {
  it("runs only on dependency update", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);

    // Mount.
    const { rerender, unmount } = renderHook(
      ({ count }) => useUpdate(effect, [count]),
      { initialProps: { count: 0 } }
    );
    expect(effect).toHaveBeenCalledTimes(0);
    expect(cleanup).toHaveBeenCalledTimes(0);

    // Dependency update 1.
    rerender({ count: 1 });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(0);

    // Dependency update 2.
    rerender({ count: 2 });
    expect(effect).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(1);

    // Irrelevant update.
    rerender({ count: 2 });
    expect(effect).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(1);

    // Unmount.
    unmount();
    expect(effect).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(2);
  });

  it("never runs with no dependency", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);

    // Mount + Update + Unmount.
    const { rerender, unmount } = renderHook(() => useUpdate(effect));
    rerender();
    unmount();
    expect(effect).toHaveBeenCalledTimes(0);
    expect(cleanup).toHaveBeenCalledTimes(0);
  });
});
