import { act, renderHook } from "@testing-library/react";
import { useBoolean } from "../src/use-boolean";

describe("useBoolean", () => {
  it("can receive initial value", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toEqual(true);
  });

  it("can toggle", () => {
    const { result } = renderHook(() => useBoolean());

    // Toggle from false to true.
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toEqual(true);

    // Toggle from true to false.
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toEqual(false);
  });

  it("can turn on", () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => {
      result.current.on();
    });
    expect(result.current.value).toEqual(true);
  });

  it("can turn off", () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => {
      result.current.off();
    });
    expect(result.current.value).toEqual(false);
  });
});
