import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "src/use-local-storage";

afterEach(() => localStorage.clear());

describe("initialization without stored value", () => {
  it("defaults to undefined", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("can default to any value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("age", { defaultValue: 24 })
    );
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual(null);
  });
});

describe("initialization with stored value", () => {
  beforeEach(() => localStorage.setItem("age", "18"));

  it("reads storage", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");
  });

  it("ignores default value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("age", { defaultValue: 24 })
    );
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");
  });
});

describe("abilities", () => {
  beforeEach(() => localStorage.setItem("age", "18"));

  it("can set storage to any value", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.set(24));
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual("24");
  });

  it("can set storage with a function", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.set((prev: number) => prev + 6));
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual("24");
  });

  it("can remove storage", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("can remove storage by setting value to undefined", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.set(undefined));
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("can customize serializer and deserializer", () => {
    const { result } = renderHook(() =>
      useLocalStorage<number>("age", {
        serializer: (num) => String(num + 1),
        deserializer: (str) => Number(str) - 1,
      })
    );
    expect(result.current.value).toEqual(17);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.set(24));
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual("25");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });
});
