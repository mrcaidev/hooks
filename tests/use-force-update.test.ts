import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { useForceUpdate } from "../src/use-force-update";

describe("useForceUpdate", () => {
  it("can force an update", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => {
      useEffect(fn);
      return useForceUpdate();
    });
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => {
      result.current();
    });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
