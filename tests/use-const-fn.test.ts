import { renderHook } from "@testing-library/react";
import { useConst } from "../src/use-const";

describe("useConst", () => {
  it("does not change over rerenders", () => {
    // Memorize the function.
    const { result, rerender } = renderHook(() =>
      useConst(() => {
        return (value: any) => value;
      })
    );
    const firstFn = result.current;
    expect(firstFn(1)).toEqual(1);

    // Rerender and see if the function is created again.
    rerender();
    const secondFn = result.current;
    expect(secondFn(2)).toEqual(2);
    expect(firstFn === secondFn).toEqual(true);
  });
});
