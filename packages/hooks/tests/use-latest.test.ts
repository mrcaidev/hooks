import { renderHook } from "@testing-library/react";
import { useLatest } from "src/use-latest";

it("returns latest primitive", () => {
  const { result, rerender } = renderHook((count) => useLatest(count), {
    initialProps: 0,
  });
  expect(result.current.current).toEqual(0);

  rerender(1);
  expect(result.current.current).toEqual(1);

  rerender(2);
  expect(result.current.current).toEqual(2);
});

it("returns latest object", () => {
  const { result, rerender } = renderHook((obj) => useLatest(obj), {
    initialProps: { a: 1 },
  });
  expect(result.current.current).toEqual({ a: 1 });

  rerender({ a: 2 });
  expect(result.current.current).toEqual({ a: 2 });

  rerender({ a: 3 });
  expect(result.current.current).toEqual({ a: 3 });
});

it("returns latest function", () => {
  const { result, rerender } = renderHook((fn) => useLatest(fn), {
    initialProps: () => 1 as number,
  });
  expect(result.current.current()).toEqual(1);

  rerender(() => 2);
  expect(result.current.current()).toEqual(2);

  rerender(() => 3);
  expect(result.current.current()).toEqual(3);
});
