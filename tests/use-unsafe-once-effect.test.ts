import { configure, renderHook } from "@testing-library/react";
import { useUnsafeOnceEffect } from "src";

configure({ reactStrictMode: true });

it("runs exactly once", () => {
  const cleanup = vi.fn();
  const effect = vi.fn(() => cleanup);

  const { rerender, unmount } = renderHook(() => useUnsafeOnceEffect(effect));

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  unmount();

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(1);
});
