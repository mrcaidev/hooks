import { act, renderHook } from "@testing-library/react";
import { useBoolean } from "src/use-boolean";

describe("useBoolean", () => {
  it("correctly sets up and tears down", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toEqual(false);
    expect(result.current.set).toBeInstanceOf(Function);
    expect(result.current.toggle).toBeInstanceOf(Function);
    expect(result.current.on).toBeInstanceOf(Function);
    expect(result.current.off).toBeInstanceOf(Function);
  });

  it("can override initial value", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toEqual(true);
  });

  it("can set", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toEqual(false);

    act(() => result.current.set(true));
    expect(result.current.value).toEqual(true);

    act(() => result.current.set(true));
    expect(result.current.value).toEqual(true);

    act(() => result.current.set(false));
    expect(result.current.value).toEqual(false);

    act(() => result.current.set(false));
    expect(result.current.value).toEqual(false);
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
