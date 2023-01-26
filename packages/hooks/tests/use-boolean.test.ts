import { act, renderHook } from "@testing-library/react";
import { useBoolean } from "src";

it("defaults to false", () => {
  const { result } = renderHook(() => useBoolean());
  expect(result.current.value).toEqual(false);
});

it("can customize default value", () => {
  const { result } = renderHook(() => useBoolean(true));
  expect(result.current.value).toEqual(true);
});

it("can set value", () => {
  const { result } = renderHook(() => useBoolean());
  expect(result.current.value).toEqual(false);

  act(() => result.current.set(true));
  expect(result.current.value).toEqual(true);

  act(() => result.current.set(false));
  expect(result.current.value).toEqual(false);
});

it("can toggle value", () => {
  const { result } = renderHook(() => useBoolean());
  expect(result.current.value).toEqual(false);

  act(() => result.current.toggle());
  expect(result.current.value).toEqual(true);

  act(() => result.current.toggle());
  expect(result.current.value).toEqual(false);
});

it("can set value to true", () => {
  const { result } = renderHook(() => useBoolean());
  expect(result.current.value).toEqual(false);

  act(() => result.current.on());
  expect(result.current.value).toEqual(true);
});

it("can set value to false", () => {
  const { result } = renderHook(() => useBoolean(true));
  expect(result.current.value).toEqual(true);

  act(() => result.current.off());
  expect(result.current.value).toEqual(false);
});
