import { renderHook } from "@testing-library/react";
import { useUnsafeOnceEffect } from "src/use-unsafe-once-effect";

it("runs exactly once", () => {
  const effect = vi.fn();
  const cleanup = vi.fn();

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
