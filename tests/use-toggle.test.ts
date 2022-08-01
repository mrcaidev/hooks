import { act, renderHook } from "@testing-library/react";
import { useToggle } from "../src/use-toggle";

describe("useToggle", () => {
  it("can toggle", () => {
    const { result } = renderHook(() => useToggle("hello", "world"));

    // Toggle from left to right.
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toEqual("world");

    // Toggle from right to left.
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toEqual("hello");
  });

  it("can set to left", () => {
    const { result } = renderHook(() => useToggle("hello", "world"));
    act(() => {
      result.current.setLeft();
    });
    expect(result.current.value).toEqual("hello");
  });

  it("can set to right", () => {
    const { result } = renderHook(() => useToggle("hello", "world"));
    act(() => {
      result.current.setRight();
    });
    expect(result.current.value).toEqual("world");
  });
});
