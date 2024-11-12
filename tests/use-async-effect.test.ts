import { renderHook } from "@testing-library/react";
import { useAsyncEffect } from "src";

it("triggers effect after every re-render by default", () => {
  const effect = vi.fn(async () => {});

  const { rerender } = renderHook(() => useAsyncEffect(effect));

  expect(effect).toHaveBeenCalledTimes(1);

  rerender();

  expect(effect).toHaveBeenCalledTimes(2);
});

it("triggers effect only on mount if dependency list is empty", () => {
  const effect = vi.fn(async () => {});

  const { rerender } = renderHook(() => useAsyncEffect(effect, []));

  expect(effect).toHaveBeenCalledTimes(1);

  rerender();

  expect(effect).toHaveBeenCalledTimes(1);
});

it("triggers effect after every dependency update", () => {
  const effect = vi.fn(async () => {});

  const { rerender } = renderHook((count) => useAsyncEffect(effect, [count]), {
    initialProps: 0,
  });

  expect(effect).toHaveBeenCalledTimes(1);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(2);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(2);
});
