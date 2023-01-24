import { fireEvent, renderHook } from "@testing-library/react";
import { useWindowSize } from "src/use-window-size";

beforeEach(() => {
  window.innerWidth = 1000;
  window.innerHeight = 500;
});

describe("useWindowSize", () => {
  it("can correctly set up and tear down", () => {
    const { result } = renderHook(() => useWindowSize());
    fireEvent(window, new UIEvent("resize"));
    expect(innerWidth).toEqual(1000);
    expect(innerHeight).toEqual(500);
    expect(result.current.width).toEqual(1000);
    expect(result.current.height).toEqual(500);
  });

  it("can respond to window resize", () => {
    const { result } = renderHook(() => useWindowSize());
    window.innerWidth = 500;
    window.innerHeight = 200;
    fireEvent(window, new UIEvent("resize"));
    expect(result.current.width).toEqual(500);
    expect(result.current.height).toEqual(200);
  });
});
