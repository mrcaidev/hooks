import { renderHook } from "@testing-library/react";
import { useUpdate } from "src";

it("only runs on component updates", () => {
  const cleanup = vi.fn();
  const effect = vi.fn(() => cleanup);

  const { rerender, unmount } = renderHook(() => useUpdate(effect));
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();
  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(1);

  unmount();
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(2);
});
