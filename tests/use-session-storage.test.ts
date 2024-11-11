import { act, renderHook } from "@testing-library/react";
import { useSessionStorage } from "src";

afterEach(() => sessionStorage.clear());

describe("without stored value", () => {
  it("defaults to undefined", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });

  it("can customize default value", () => {
    const { result } = renderHook(() =>
      useSessionStorage("age", { defaultValue: 24 }),
    );
    expect(result.current.value).toEqual(24);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });

  it("responds to stateful default value", () => {
    const { result, rerender } = renderHook(
      (defaultValue) => useSessionStorage("age", { defaultValue }),
      { initialProps: 24 },
    );
    expect(result.current.value).toEqual(24);
    expect(sessionStorage.getItem("age")).toEqual(null);

    rerender(18);
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });

  it("can create value in storage when setting", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);

    act(() => result.current.set(18));
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");
  });

  it("does nothing when removing", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });
});

describe("with stored value", () => {
  beforeEach(() => sessionStorage.setItem("age", "18"));

  it("defaults to stored value", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");
  });

  it("responds to stateful storage key", () => {
    const { result, rerender } = renderHook((key) => useSessionStorage(key), {
      initialProps: "age",
    });
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");

    rerender("name");
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("name")).toEqual(null);
  });

  it("ignores default value", () => {
    const { result } = renderHook(() =>
      useSessionStorage("age", { defaultValue: 24 }),
    );
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");
  });

  it("can customize serializer and deserializer", () => {
    const { result } = renderHook(() =>
      useSessionStorage<number>("age", {
        serializer: (num) => String(num + 1),
        deserializer: (str) => Number(str) - 1,
      }),
    );
    expect(result.current.value).toEqual(17);
    expect(sessionStorage.getItem("age")).toEqual("18");

    act(() => result.current.set(24));
    expect(result.current.value).toEqual(24);
    expect(sessionStorage.getItem("age")).toEqual("25");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });

  it("can set storage", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");

    act(() => result.current.set(24));
    expect(result.current.value).toEqual(24);
    expect(sessionStorage.getItem("age")).toEqual("24");
  });

  it("can set storage with a function", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");

    act(() => result.current.set((prev: number) => prev + 6));
    expect(result.current.value).toEqual(24);
    expect(sessionStorage.getItem("age")).toEqual("24");
  });

  it("can remove storage", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");

    act(() => result.current.remove());
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });

  it("can remove storage by setting value to undefined", () => {
    const { result } = renderHook(() => useSessionStorage("age"));
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");

    act(() => result.current.set(undefined));
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toEqual(null);
  });
});
