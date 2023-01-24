import { act, renderHook } from "@testing-library/react";
import { useToggle } from "src/use-toggle";

describe("useToggle", () => {
  it("correctly sets up and tears down", () => {
    const { result } = renderHook(() => useToggle("hello", "world"));
    expect(result.current.value).toEqual("hello");
    expect(result.current.toggle).toBeInstanceOf(Function);
    expect(result.current.setLeft).toBeInstanceOf(Function);
    expect(result.current.setRight).toBeInstanceOf(Function);
  });

  it("can toggle", () => {
    const { result } = renderHook(() => useToggle("hello", "world"));
    expect(result.current.value).toEqual("hello");

    act(() => result.current.toggle());
    expect(result.current.value).toEqual("world");

    act(() => result.current.toggle());
    expect(result.current.value).toEqual("hello");
  });

  it("can directly set to left or right", () => {
    const { result } = renderHook(() => useToggle("hello", "world"));
    expect(result.current.value).toEqual("hello");

    act(() => result.current.setRight());
    expect(result.current.value).toEqual("world");

    act(() => result.current.setRight());
    expect(result.current.value).toEqual("world");

    act(() => result.current.setLeft());
    expect(result.current.value).toEqual("hello");

    act(() => result.current.setLeft());
    expect(result.current.value).toEqual("hello");
  });
});
