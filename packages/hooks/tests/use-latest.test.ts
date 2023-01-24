import { renderHook } from "@testing-library/react";
import { useLatest } from "src/use-latest";

describe("useLatest", () => {
  it("correctly sets up and tears down", () => {
    const { result } = renderHook(() => useLatest("hello"));
    expect(result.current.current).toEqual("hello");
  });

  it("always returns latest value", () => {
    const { result, rerender } = renderHook((count) => useLatest(count), {
      initialProps: 0,
    });
    expect(result.current.current).toEqual(0);

    rerender(1);
    expect(result.current.current).toEqual(1);

    rerender(2);
    expect(result.current.current).toEqual(2);
  });
});
