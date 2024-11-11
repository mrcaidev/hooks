import { renderHook } from "@testing-library/react";
import { usePrevious } from "src";

it("stores previous state", () => {
  const { result, rerender } = renderHook((count) => usePrevious(count), {
    initialProps: 0,
  });
  expect(result.current).toEqual(undefined);

  rerender(1);
  expect(result.current).toEqual(0);

  rerender(2);
  expect(result.current).toEqual(1);
});

it("can customize equal function", () => {
  const { result, rerender } = renderHook(
    (count) => usePrevious(count, () => true),
    { initialProps: 0 },
  );
  expect(result.current).toEqual(undefined);

  rerender(1);
  expect(result.current).toEqual(undefined);

  rerender(2);
  expect(result.current).toEqual(undefined);
});
