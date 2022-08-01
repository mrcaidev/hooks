import { act, renderHook } from "@testing-library/react";
import { useTheme } from "../src/use-theme";

beforeAll(() => {
  // Mock device environment: Dark preferred.
  const device: Record<string, boolean> = {
    "(prefers-color-scheme: dark)": true,
  };

  // Mock `window.matchMedia`.
  window.matchMedia = (query: string) => {
    return {
      matches: device[query] ?? false,
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any as MediaQueryList;
  };
});

describe("useTheme", () => {
  it("can detect OS theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toEqual("dark");
  });

  it("can override OS theme", () => {
    const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
    expect(result.current.theme).toEqual("light");
  });

  it("can specify storage key", () => {
    const { result } = renderHook(() => useTheme({ storageKey: "test" }));
    expect(result.current.theme).toEqual("dark");
    expect(localStorage.getItem("test")).toEqual(null);

    act(() => result.current.toggle());
    expect(result.current.theme).toEqual("light");
    expect(localStorage.getItem("test")).toEqual('"light"');
  });

  it("can toggle theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toEqual("dark");

    act(() => result.current.toggle());
    expect(result.current.theme).toEqual("light");

    act(() => result.current.toggle());
    expect(result.current.theme).toEqual("dark");
  });

  it("can set to light", () => {
    const { result } = renderHook(() => useTheme({ defaultTheme: "dark" }));
    expect(result.current.theme).toEqual("dark");

    act(() => result.current.setLight());
    expect(result.current.theme).toEqual("light");
  });

  it("can set to dark", () => {
    const { result } = renderHook(() => useTheme({ defaultTheme: "light" }));
    expect(result.current.theme).toEqual("light");

    act(() => result.current.setDark());
    expect(result.current.theme).toEqual("dark");
  });
});
