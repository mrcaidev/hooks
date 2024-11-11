import { renderHook } from "@testing-library/react";
import { useAsyncEffect } from "src";

const asyncFn = async () => {
  // Some async logic.
};

it("triggers effect after every re-render by default", () => {
  const effect = vi.fn(asyncFn);

  const { rerender } = renderHook(() => useAsyncEffect(effect));
  expect(effect).toHaveBeenCalledTimes(1);

  rerender();
  expect(effect).toHaveBeenCalledTimes(2);
});

it("triggers effect only on mount with empty dependency list", () => {
  const effect = vi.fn(asyncFn);

  const { rerender } = renderHook(() => useAsyncEffect(effect, []));
  expect(effect).toHaveBeenCalledTimes(1);

  rerender();
  expect(effect).toHaveBeenCalledTimes(1);
});

it("triggers effect after every dependency updates", () => {
  const effect = vi.fn(asyncFn);

  const { rerender } = renderHook((count) => useAsyncEffect(effect, [count]), {
    initialProps: 0,
  });
  expect(effect).toHaveBeenCalledTimes(1);

  rerender(1);
  expect(effect).toHaveBeenCalledTimes(2);

  rerender(1);
  expect(effect).toHaveBeenCalledTimes(2);
});
