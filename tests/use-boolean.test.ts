import { act, renderHook } from "@testing-library/react";
import { useBoolean } from "../src/use-boolean";

describe("useBoolean", () => {
  it("sets up correctly", () => {
    const { result: resultA } = renderHook(() => useBoolean());
    expect(resultA.current.value).toEqual(false);

    const { result: resultB } = renderHook(() => useBoolean(false));
    expect(resultB.current.value).toEqual(false);

    const { result: resultC } = renderHook(() => useBoolean(true));
    expect(resultC.current.value).toEqual(true);
  });

  it("can toggle", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toEqual(false);

    act(() => result.current.toggle());
    expect(result.current.value).toEqual(true);

    act(() => result.current.toggle());
    expect(result.current.value).toEqual(false);
  });

  it("can turn on", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toEqual(false);

    act(() => result.current.on());
    expect(result.current.value).toEqual(true);

    act(() => result.current.on());
    expect(result.current.value).toEqual(true);
  });

  it("can turn off", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toEqual(true);

    act(() => result.current.off());
    expect(result.current.value).toEqual(false);

    act(() => result.current.off());
    expect(result.current.value).toEqual(false);
  });
});
