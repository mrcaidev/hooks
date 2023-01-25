import { act, renderHook } from "@testing-library/react";
import { useBoolean } from "src/use-boolean";

it("defaults to false", () => {
  const { result } = renderHook(() => useBoolean());
  expect(result.current.value).toEqual(false);
});

it("can default to true", () => {
  const { result } = renderHook(() => useBoolean(true));
  expect(result.current.value).toEqual(true);
});

it("can set to any value", () => {
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

it("can turn on", () => {
  const { result } = renderHook(() => useBoolean());
  expect(result.current.value).toEqual(false);

  act(() => result.current.on());
  expect(result.current.value).toEqual(true);
});

it("can turn off", () => {
  const { result } = renderHook(() => useBoolean(true));
  expect(result.current.value).toEqual(true);

  act(() => result.current.off());
  expect(result.current.value).toEqual(false);
});
