import { fireEvent, renderHook } from "@testing-library/react";
import { useWindowSize } from "src/use-window-size";

beforeEach(() => {
  window.innerWidth = 1000;
  window.innerHeight = 500;
});

it("reads window size", () => {
  const { result } = renderHook(() => useWindowSize());
  expect(result.current.width).toEqual(1000);
  expect(result.current.height).toEqual(500);
});

it("can respond to window resize", () => {
  const { result } = renderHook(() => useWindowSize());
  expect(result.current.width).toEqual(1000);
  expect(result.current.height).toEqual(500);

  window.innerWidth = 500;
  window.innerHeight = 200;
  fireEvent(window, new UIEvent("resize"));
  expect(result.current.width).toEqual(500);
  expect(result.current.height).toEqual(200);
});
