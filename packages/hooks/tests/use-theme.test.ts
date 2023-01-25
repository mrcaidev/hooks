import { act, renderHook } from "@testing-library/react";
import { useTheme } from "src/use-theme";

beforeAll(() => {
  const device: Record<string, boolean> = {
    "(prefers-color-scheme: dark)": true,
  };

  window.matchMedia = (query: string) => {
    return {
      matches: device[query] ?? false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;
  };
});

afterEach(() => localStorage.clear());

it("detects OS theme", () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toEqual("dark");
});

it("prefers default theme to OS theme", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
  expect(result.current.theme).toEqual("light");
});

it("does not persist default theme", () => {
  renderHook(() => useTheme({ defaultTheme: "light" }));
  expect(localStorage.getItem("theme")).toEqual(null);
});

it("prefers user theme to default theme", () => {
  localStorage.setItem("theme", "dark");

  const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
  expect(result.current.theme).toEqual("dark");
});

it("can customize storage key", () => {
  const { result } = renderHook(() => useTheme({ storageKey: "test" }));
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.toggle());
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("test")).toEqual("light");
});

it("can set to either theme", () => {
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

it("can set to light", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "dark" }));
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.setLight());
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual("light");
});

it("can set to dark", () => {
  const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
  expect(result.current.theme).toEqual("light");
  expect(localStorage.getItem("theme")).toEqual(null);

  act(() => result.current.setDark());
  expect(result.current.theme).toEqual("dark");
  expect(localStorage.getItem("theme")).toEqual("dark");
});
