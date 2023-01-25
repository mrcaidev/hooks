import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "src/use-local-storage";

afterEach(() => localStorage.clear());

describe("without pre-stored value", () => {
  it("reads storage", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("can default to any value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("age", { defaultValue: 24 })
    );
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual(null);

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.remove());
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
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("19");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });
});

describe("with pre-stored value", () => {
  beforeEach(() => localStorage.setItem("age", "24"));

  it("reads storage", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual("24");

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("ignores default value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("age", { defaultValue: 32 })
    );
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual("24");

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    act(() => result.current.remove());
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
    expect(result.current.value).toEqual(23);
    expect(localStorage.getItem("age")).toEqual("24");

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("19");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });
});
