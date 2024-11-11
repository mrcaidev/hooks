import { act, renderHook } from "@testing-library/react";
import { useToggle } from "src";

it("defaults to left-side value", () => {
  const { result } = renderHook(() => useToggle("hello", "world"));
  expect(result.current.value).toEqual("hello");
});

it("can set value", () => {
  const { result } = renderHook(() => useToggle("hello", "world"));
  expect(result.current.value).toEqual("hello");

  act(() => result.current.set("world"));
  expect(result.current.value).toEqual("world");

  act(() => result.current.set("hello"));
  expect(result.current.value).toEqual("hello");
});

it("can toggle value", () => {
  const { result } = renderHook(() => useToggle("hello", "world"));
  expect(result.current.value).toEqual("hello");

  act(() => result.current.toggle());
  expect(result.current.value).toEqual("world");

  act(() => result.current.toggle());
  expect(result.current.value).toEqual("hello");
});

it("can set value to left-side", () => {
  const { result } = renderHook(() => useToggle("hello", "world"));
  expect(result.current.value).toEqual("hello");

  act(() => result.current.setRight());
  expect(result.current.value).toEqual("world");

  act(() => result.current.setLeft());
  expect(result.current.value).toEqual("hello");
});

it("can set value to right-side", () => {
  const { result } = renderHook(() => useToggle("hello", "world"));
  expect(result.current.value).toEqual("hello");

  act(() => result.current.setRight());
  expect(result.current.value).toEqual("world");
});
