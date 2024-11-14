import { renderHook } from "@testing-library/react";
import { useConst } from "src";

it("memoizes the value across re-renders", () => {
  const compute = vi.fn(() => 1);

  const { result, rerender } = renderHook(() => useConst(compute));

  expect(result.current).toEqual(1);
  expect(compute).toHaveBeenCalledTimes(1);

  rerender();

  expect(result.current).toEqual(1);
  expect(compute).toHaveBeenCalledTimes(1);
});
