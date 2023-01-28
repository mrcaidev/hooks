import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import { useClipboardText } from "src";

let clipboard = "hello";
const readText = vi.fn(async () => clipboard);
const writeText = vi.fn(async (text: string) => (clipboard = text));

beforeAll(() => {
  vi.stubGlobal("navigator", {
    clipboard: {
      readText,
      writeText,
    },
  });
});
afterAll(() => {
  vi.unstubAllGlobals();
});
beforeEach(() => {
  clipboard = "hello";
  readText.mockClear();
  writeText.mockClear();
});

it("reads clipboard", async () => {
  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
});

it("responds to cut events", async () => {
  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);

  clipboard = "world";
  fireEvent.cut(document);
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});

it("responds to copy events", async () => {
  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);

  clipboard = "world";
  fireEvent.copy(document);
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});

it("returns error when read fails", async () => {
  const error = new Error("read failed");
  readText.mockImplementationOnce(async () => {
    throw error;
  });

  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.error).toEqual(error));
  expect(result.current.text).toEqual("");
});

it("returns error when write fails", async () => {
  const error = new Error("write failed");
  writeText.mockImplementationOnce(async () => {
    throw error;
  });

  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);

  await result.current.copy("world");
  await waitFor(() => expect(result.current.error).toEqual(error));
  expect(result.current.text).toEqual("hello");
});

it("can disable read on mount", async () => {
  const { result } = renderHook(() => useClipboardText({ readOnMount: false }));
  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);

  clipboard = "world";
  fireEvent.copy(document);
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);

  expect(readText).not.toHaveReturnedWith("hello");
});

it("responds to stateful readOnMount", async () => {
  const { result, rerender } = renderHook(
    (readOnMount) => useClipboardText({ readOnMount }),
    { initialProps: false }
  );
  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);

  rerender(true);
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
});

it("can manually copy text", async () => {
  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);

  await result.current.copy("world");
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});
