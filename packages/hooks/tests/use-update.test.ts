import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useUpdate } from "src/use-update";

it("only runs on dependency update", () => {
  const cleanup = vi.fn();
  const effect = vi.fn();

  const { result, rerender, unmount } = renderHook(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    useUpdate(() => {
      effect();
      return cleanup;
    }, [count]);
    return { increment };
  });
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(1);
  expect(cleanup).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(1);

  rerender();
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(1);

  unmount();
  expect(effect).toHaveBeenCalledTimes(2);
  expect(cleanup).toHaveBeenCalledTimes(2);
});

it("never runs without dependency", () => {
  const cleanup = vi.fn();
  const effect = vi.fn();

  const { result, rerender, unmount } = renderHook(() => {
    const [, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    useUpdate(() => {
      effect();
      return cleanup;
    }, []);
    return { increment };
  });
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  act(() => result.current.increment());
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  rerender();
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);

  unmount();
  expect(effect).toHaveBeenCalledTimes(0);
  expect(cleanup).toHaveBeenCalledTimes(0);
});
