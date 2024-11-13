import { fireEvent, renderHook } from "@testing-library/react";
import { useWindowSize } from "src";

it("returns window size", () => {
  window.innerWidth = 200;
  window.innerHeight = 100;

  const { result } = renderHook(() => useWindowSize());

  expect(result.current.width).toEqual(200);
  expect(result.current.height).toEqual(100);

  window.innerWidth = 400;
  window.innerHeight = 300;
  fireEvent.resize(window);

  expect(result.current.width).toEqual(400);
  expect(result.current.height).toEqual(300);
});
