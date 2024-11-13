import { renderHook } from "@testing-library/react";
import { useMount } from "src";

it("runs only on mount", () => {
  const cleanup = vi.fn();
  const effect = vi.fn(() => cleanup);

  const { rerender, unmount } = renderHook(() => useMount(effect));

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
