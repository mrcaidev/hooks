import { renderHook } from "@testing-library/react";
import { useConst } from "src/use-const";

it("remembers the value", () => {
  const { result } = renderHook(() => useConst(() => 1));
  expect(result.current).toEqual(1);
});

it("computes only once across re-renders", () => {
  const compute = vi.fn();

  const { rerender } = renderHook(() => useConst(compute));
  expect(compute).toHaveBeenCalledTimes(1);

  rerender();
  expect(compute).toHaveBeenCalledTimes(1);
});
