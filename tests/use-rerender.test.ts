import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { useRerender } from "src";

it("forces a re-render", () => {
  const effect = vi.fn();

  const { result } = renderHook(() => {
    const rerender = useRerender();
    useEffect(effect);
    return rerender;
  });

  expect(effect).toHaveBeenCalledTimes(1);

  act(() => result.current());

  expect(effect).toHaveBeenCalledTimes(2);

  act(() => result.current());

  expect(effect).toHaveBeenCalledTimes(3);
});
