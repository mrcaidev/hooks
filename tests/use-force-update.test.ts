import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { useForceUpdate } from "../src/use-force-update";

describe("useForceUpdate", () => {
  it("can force an update", () => {
    const effect = jest.fn();

    const { result } = renderHook(() => {
      useEffect(effect);
      return useForceUpdate();
    });
    expect(effect).toHaveBeenCalledTimes(1);

    act(() => result.current());
    expect(effect).toHaveBeenCalledTimes(2);
  });
});
