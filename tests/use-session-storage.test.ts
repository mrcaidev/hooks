import { act, renderHook } from "@testing-library/react";
import { useSessionStorage } from "src";

const mockGetItem = vi.spyOn(Storage.prototype, "getItem");
const mockSetItem = vi.spyOn(Storage.prototype, "setItem");
const mockRemoveItem = vi.spyOn(Storage.prototype, "removeItem");

afterEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

it("returns `undefined` if there is no stored value", () => {
  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);
});

it("returns stored value if there is stored value", () => {
  sessionStorage.setItem("test", "1");

  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("1");
});

it("responds to dynamic `key`", () => {
  sessionStorage.setItem("test1", "1");

  const { result, rerender } = renderHook((key) => useSessionStorage(key), {
    initialProps: "test1",
  });

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test1")).toEqual("1");

  rerender("test2");

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test2")).toEqual(null);
});

it("can set value with a value", () => {
  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);

  act(() => result.current.set(1));

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("1");

  act(() => result.current.set(2));

  expect(result.current.value).toEqual(2);
  expect(sessionStorage.getItem("test")).toEqual("2");
});

it("can set value with a function", () => {
  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);

  act(() => result.current.set((prev: number) => (prev ?? 0) + 1));

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("1");

  act(() => result.current.set((prev: number) => (prev ?? 0) + 1));

  expect(result.current.value).toEqual(2);
  expect(sessionStorage.getItem("test")).toEqual("2");
});

it("can remove value", () => {
  sessionStorage.setItem("test", "1");

  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("1");

  act(() => result.current.remove());

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);

  act(() => result.current.remove());

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);
});

it("returns `defaultValue` if there is no stored value", () => {
  const { result, rerender } = renderHook(
    (defaultValue) => useSessionStorage("test", { defaultValue }),
    { initialProps: 1 },
  );

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual(null);

  rerender(2);

  expect(result.current.value).toEqual(2);
  expect(sessionStorage.getItem("test")).toEqual(null);
});

it("ignores `defaultValue` if there is stored value", () => {
  sessionStorage.setItem("test", "3");

  const { result, rerender } = renderHook(
    (defaultValue) => useSessionStorage("test", { defaultValue }),
    { initialProps: 1 },
  );

  expect(result.current.value).toEqual(3);
  expect(sessionStorage.getItem("test")).toEqual("3");

  rerender(2);

  expect(result.current.value).toEqual(3);
  expect(sessionStorage.getItem("test")).toEqual("3");
});

it("returns `defaultValue` after removing value", () => {
  sessionStorage.setItem("test", "3");

  const { result } = renderHook(() =>
    useSessionStorage("test", { defaultValue: 1 }),
  );

  expect(result.current.value).toEqual(3);
  expect(sessionStorage.getItem("test")).toEqual("3");

  act(() => result.current.remove());

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual(null);
});

it("can customize `serializer` and `deserializer`", () => {
  const { result } = renderHook(() =>
    useSessionStorage<number>("test", {
      serializer: (value) => String(value + 1),
      deserializer: (value) => Number(value) - 1,
    }),
  );

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);

  act(() => result.current.set(1));

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("2");

  act(() => result.current.set(2));

  expect(result.current.value).toEqual(2);
  expect(sessionStorage.getItem("test")).toEqual("3");
});

it("returns `undefined` if `sessionStorage.getItem` throws an error", () => {
  sessionStorage.setItem("test", "1");
  mockGetItem.mockImplementationOnce(() => {
    throw new Error("test");
  });

  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual("1");
});

it("does not set value if `sessionStorage.setItem` throws an error", () => {
  mockSetItem.mockImplementationOnce(() => {
    throw new Error("test");
  });

  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);

  act(() => result.current.set(1));

  expect(result.current.value).toEqual(undefined);
  expect(sessionStorage.getItem("test")).toEqual(null);
});

it("does not remove value if `sessionStorage.removeItem` throws an error", () => {
  sessionStorage.setItem("test", "1");
  mockRemoveItem.mockImplementationOnce(() => {
    throw new Error("test");
  });

  const { result } = renderHook(() => useSessionStorage("test"));

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("1");

  act(() => result.current.remove());

  expect(result.current.value).toEqual(1);
  expect(sessionStorage.getItem("test")).toEqual("1");
});
