import { fireEvent, renderHook } from "@testing-library/react";
import { useWindowSize } from "src";

beforeEach(() => {
  window.innerWidth = 1024;
  window.innerHeight = 768;
});

it("reads window size", () => {
  const { result } = renderHook(() => useWindowSize());
  expect(result.current.width).toEqual(1024);
  expect(result.current.height).toEqual(768);
});

it("responds to window resize events", () => {
  const { result } = renderHook(() => useWindowSize());
  expect(result.current.width).toEqual(1024);
  expect(result.current.height).toEqual(768);

  window.innerWidth = 500;
  window.innerHeight = 200;
  fireEvent.resize(window);
  expect(result.current.width).toEqual(500);
  expect(result.current.height).toEqual(200);
});
