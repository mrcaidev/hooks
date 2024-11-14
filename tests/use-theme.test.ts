import { act, renderHook } from "@testing-library/react";
import { useTheme, type Theme } from "src";

beforeAll(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

afterEach(() => {
  localStorage.clear();
});

afterAll(() => {
  vi.unstubAllGlobals();
});

it("defaults to device theme", () => {
  const { result } = renderHook(() => useTheme());

  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("prefers default theme to device theme", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("prefers stored theme to device theme", () => {
  localStorage.setItem("theme", "light");

  const { result } = renderHook(() => useTheme());

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");
});

it("prefers stored theme to default theme", () => {
  localStorage.setItem("theme", "light");

  const { result } = renderHook(() => useTheme({ defaultTheme: "dark" }));

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");
});

it("responds to dynamic `defaultTheme`", () => {
  const { result, rerender } = renderHook(
    (defaultTheme: Theme) => useTheme({ defaultTheme }),
    { initialProps: "light" },
  );

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual(null);

  rerender("dark");

  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("can customize `storageKey`", () => {
  const { result } = renderHook(() => useTheme({ storageKey: "test" }));

  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.toggle());

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("test")).toEqual("light");
});

it("responds to dynamic `storageKey`", () => {
  localStorage.setItem("test1", "light");
  localStorage.setItem("test2", "dark");

  const { result, rerender } = renderHook(
    (storageKey: string) => useTheme({ storageKey }),
    { initialProps: "test1" },
  );

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("test1")).toEqual("light");

  rerender("test2");

  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("test2")).toEqual("dark");
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

it("can set theme to light", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "dark" }));

  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.setLight());

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");

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

  act(() => result.current.setDark());

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

it("can reset theme", () => {
  localStorage.setItem("theme", "light");

  const { result } = renderHook(() => useTheme());

  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");

  act(() => result.current.reset());

  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);
});
