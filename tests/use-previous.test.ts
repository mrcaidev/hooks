import { renderHook } from "@testing-library/react";
import { usePrevious } from "src";

it("returns previous state", () => {
  const { result, rerender } = renderHook((count) => usePrevious(count), {
    initialProps: 0,
  });

  expect(result.current).toEqual(null);

  rerender(1);

  expect(result.current).toEqual(0);

  rerender(2);

  expect(result.current).toEqual(1);
});

it("can customize `equalFn`", () => {
  const { result, rerender } = renderHook(
    (count) => usePrevious(count, () => true),
    { initialProps: 0 },
  );

  expect(result.current).toEqual(null);

  rerender(1);

  expect(result.current).toEqual(null);

  rerender(2);

  expect(result.current).toEqual(null);
});
