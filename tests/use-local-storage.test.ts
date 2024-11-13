import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "src";

const mockGetItem = vi.spyOn(Storage.prototype, "getItem");
const mockSetItem = vi.spyOn(Storage.prototype, "setItem");
const mockRemoveItem = vi.spyOn(Storage.prototype, "removeItem");

afterEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

it("returns `null` if there is no stored value", () => {
  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);
});

it("returns stored value if there is stored value", () => {
  localStorage.setItem("test", "1");

  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("1");
});

it("responds to dynamic `key`", () => {
  localStorage.setItem("test1", "1");

  const { result, rerender } = renderHook((key) => useLocalStorage(key), {
    initialProps: "test1",
  });

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test1")).toEqual("1");

  rerender("test2");

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test2")).toEqual(null);
});

it("can set value with a value", () => {
  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.set(1));

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("1");

  act(() => result.current.set(2));

  expect(result.current.value).toEqual(2);
  expect(localStorage.getItem("test")).toEqual("2");
});

it("can set value with a function", () => {
  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.set((prev: number) => (prev ?? 0) + 1));

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("1");

  act(() => result.current.set((prev: number) => (prev ?? 0) + 1));

  expect(result.current.value).toEqual(2);
  expect(localStorage.getItem("test")).toEqual("2");
});

it("can remove value", () => {
  localStorage.setItem("test", "1");

  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("1");

  act(() => result.current.remove());

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.remove());

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);
});

it("can customize `serializer` and `deserializer`", () => {
  const { result } = renderHook(() =>
    useLocalStorage<number>("test", {
      serializer: (value) => String(value + 1),
      deserializer: (value) => Number(value) - 1,
    }),
  );

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.set(1));

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("2");

  act(() => result.current.set(2));

  expect(result.current.value).toEqual(2);
  expect(localStorage.getItem("test")).toEqual("3");
});

it("returns `null` if `localStorage.getItem` throws an error", () => {
  localStorage.setItem("test", "1");
  mockGetItem.mockImplementationOnce(() => {
    throw new Error("test");
  });

  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual("1");
});

it("does not set value if `localStorage.setItem` throws an error", () => {
  mockSetItem.mockImplementationOnce(() => {
    throw new Error("test");
  });

  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);

  act(() => result.current.set(1));

  expect(result.current.value).toEqual(null);
  expect(localStorage.getItem("test")).toEqual(null);
});

it("does not remove value if `localStorage.removeItem` throws an error", () => {
  localStorage.setItem("test", "1");
  mockRemoveItem.mockImplementationOnce(() => {
    throw new Error("test");
  });

  const { result } = renderHook(() => useLocalStorage("test"));

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("1");

  act(() => result.current.remove());

  expect(result.current.value).toEqual(1);
  expect(localStorage.getItem("test")).toEqual("1");
});
