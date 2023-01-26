import { renderHook } from "@testing-library/react";
import { useUpdate } from "src/use-update";

it("runs on dependency update", () => {
  const cleanup = vi.fn();
  const effect = vi.fn();

  const { rerender, unmount } = renderHook(
    (count) =>
      useUpdate(() => {
        effect();
        return cleanup;
      }, [count]),
    { initialProps: 0 }
  );
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(1);
  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(2);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(1);

  unmount();
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(2);
});

it("does not run when dependency stays the same", () => {
  const cleanup = vi.fn();
  const effect = vi.fn();

  const { rerender, unmount } = renderHook(
    (count) =>
      useUpdate(() => {
        effect();
        return cleanup;
      }, [count]),
    { initialProps: 0 }
  );
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(0);
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender(0);
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  unmount();
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);
});

it("never runs without dependency", () => {
  const cleanup = vi.fn();
  const effect = vi.fn();

  const { rerender, unmount } = renderHook(() =>
    useUpdate(() => {
      effect();
      return cleanup;
    }, [])
  );
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
