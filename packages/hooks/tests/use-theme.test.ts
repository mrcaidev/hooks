import { act, renderHook } from "@testing-library/react";
import { useTheme, type Theme } from "src";
import { matchMedia } from "./utils/match-media";

beforeAll(() => {
  vi.stubGlobal("matchMedia", matchMedia);
});
afterAll(() => {
  vi.unstubAllGlobals();
});
afterEach(() => localStorage.clear());

it("defaults to device theme", () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("prefers default theme to OS theme", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("responds to stateful default theme", () => {
  const { result, rerender } = renderHook(
    (defaultTheme: Theme) => useTheme({ defaultTheme }),
    { initialProps: "light" }
  );
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual(null);

  rerender("dark");
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("prefers user theme to default theme", () => {
  localStorage.setItem("theme", "light");

  const { result } = renderHook(() => useTheme({ defaultTheme: "dark" }));
  expect(result.current.theme).toEqual("light");
});

it("can customize storage key", () => {
  const { result } = renderHook(() => useTheme({ storageKey: "test" }));
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.toggle());
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("test")).toEqual("light");
});

it("responds to stateful storage key", () => {
  localStorage.setItem("test", "light");
  localStorage.setItem("theme", "dark");

  const { result, rerender } = renderHook(
    (storageKey: string) => useTheme({ storageKey }),
    { initialProps: "test" }
  );
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("test")).toEqual("light");

  rerender("theme");
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual("dark");
});

it("can set theme", () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.set("light"));
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");

  act(() => result.current.set("dark"));
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual("dark");
});

it("can toggle theme", () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.toggle());
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");

  act(() => result.current.toggle());
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual("dark");
});

it("can set theme to light", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "dark" }));
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.setLight());
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");
});

it("can set theme to dark", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.setDark());
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual("dark");
});
