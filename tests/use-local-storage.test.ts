import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "src";

afterEach(() => localStorage.clear());

describe("without stored value", () => {
  it("defaults to undefined", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("can customize default value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("age", { defaultValue: 24 }),
    );
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("responds to stateful default value", () => {
    const { result, rerender } = renderHook(
      (defaultValue) => useLocalStorage("age", { defaultValue }),
      { initialProps: 24 },
    );
    expect(result.current.value).toEqual(24);
    expect(localStorage.getItem("age")).toEqual(null);

    rerender(18);
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual(null);
  });

  it("can create value in storage when setting", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");
  });

  it("does nothing when removing", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toEqual(null);
  });
});

describe("with stored value", () => {
  beforeEach(() => localStorage.setItem("age", "18"));

  it("defaults to stored value", () => {
    const { result } = renderHook(() => useLocalStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");
  });

  it("responds to stateful storage key", () => {
    const { result, rerender } = renderHook((key) => useLocalStorage(key), {
      initialProps: "age",
    });
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    rerender("name");
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("name")).toEqual(null);
  });

  it("ignores default value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("age", { defaultValue: 24 }),
    );
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");
  });

  it("can customize serializer and deserializer", () => {
    const { result } = renderHook(() =>
      useLocalStorage<number>("age", {
        serializer: (num) => String(num + 1),
        deserializer: (str) => Number(str) - 1,
      }),
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

  it("can set storage", () => {
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
});
