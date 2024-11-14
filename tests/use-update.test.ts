import { renderHook } from "@testing-library/react";
import { useUpdate } from "src";

it("runs only on component updates", () => {
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

it("never runs if dependency list is empty", () => {
  const cleanup = vi.fn();
  const effect = vi.fn(() => cleanup);

  const { rerender, unmount } = renderHook(() => useUpdate(effect, []));

  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();

  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();

  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  unmount();

  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);
});

it("runs only on dependency updates if dependency list is not empty", () => {
  const cleanup = vi.fn();
  const effect = vi.fn(() => cleanup);

  const { rerender, unmount } = renderHook(
    (count) => useUpdate(effect, [count]),
    { initialProps: 0 },
  );

  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(0);

  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  unmount();

  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(1);
});
