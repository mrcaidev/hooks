import { act, renderHook } from "@testing-library/react";
import { useCounter } from "src";

it("defaults to 0", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);
});

it("can customize default value", () => {
  const { result } = renderHook(() => useCounter(1));
  expect(result.current.count).toEqual(1);
});

it("can set value", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);

  act(() => result.current.set(1));
  expect(result.current.count).toEqual(1);

  act(() => result.current.set(-1));
  expect(result.current.count).toEqual(-1);
});

it("can increment value by 1", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.count).toEqual(1);

  act(() => result.current.increment());
  expect(result.current.count).toEqual(2);
});

it("can increment value by any number", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);

  act(() => result.current.incrementBy(2));
  expect(result.current.count).toEqual(2);

  act(() => result.current.incrementBy(2));
  expect(result.current.count).toEqual(4);
});

it("can decrement value by 1", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);

  act(() => result.current.decrement());
  expect(result.current.count).toEqual(-1);

  act(() => result.current.decrement());
  expect(result.current.count).toEqual(-2);
});

it("can decrement value by any number", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);

  act(() => result.current.decrementBy(2));
  expect(result.current.count).toEqual(-2);

  act(() => result.current.decrementBy(2));
  expect(result.current.count).toEqual(-4);
});

it("can reset value", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toEqual(0);

  act(() => result.current.increment());
  expect(result.current.count).toEqual(1);

  act(() => result.current.reset());
  expect(result.current.count).toEqual(0);
});
