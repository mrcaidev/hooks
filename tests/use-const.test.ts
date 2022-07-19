import { renderHook } from "@testing-library/react";
import { useConst } from "../src/use-const";

describe("useConst", () => {
  it("computes only once", () => {
    const expensiveComputation = jest.fn();

    // Compute and cache result.
    const { result, rerender } = renderHook(
      ({ base }) =>
        useConst(() => {
          expensiveComputation();
          return base * 2;
        }),
      { initialProps: { base: 1 } }
    );
    expect(result.current).toEqual(2);
    expect(expensiveComputation).toHaveBeenCalledTimes(1);

    // Rerender and see if the value is computed again.
    rerender({ base: 2 });
    expect(result.current).toEqual(2);
    expect(expensiveComputation).toHaveBeenCalledTimes(1);
  });
});
