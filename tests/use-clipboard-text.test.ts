import { act, fireEvent, renderHook, waitFor } from "@testing-library/react";
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

it("reads clipboard on mount", async () => {
  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(readText).toHaveBeenCalledTimes(1);
});

it("can disable read on mount", async () => {
  const { result } = renderHook(() => useClipboardText({ readOnMount: false }));
  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);
  expect(readText).toHaveBeenCalledTimes(0);
});

it("responds to stateful readOnMount", async () => {
  const { result, rerender } = renderHook(
    (readOnMount) => useClipboardText({ readOnMount }),
    { initialProps: false },
  );
  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);
  expect(readText).toHaveBeenCalledTimes(0);

  rerender(true);
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(readText).toHaveBeenCalledTimes(1);
});

it("can manually read", async () => {
  const { result } = renderHook(() => useClipboardText({ readOnMount: false }));
  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);
  expect(readText).toHaveBeenCalledTimes(0);

  await act(async () => await result.current.read());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(readText).toHaveBeenCalledTimes(1);
});

it("can manually write", async () => {
  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(writeText).toHaveBeenCalledTimes(0);

  await act(async () => await result.current.write("world"));
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
  expect(writeText).toHaveBeenCalledTimes(1);
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

it("recovers from error on any successful read", async () => {
  readText.mockImplementationOnce(async () => {
    throw new Error("fail");
  });

  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.error).not.toEqual(undefined));

  await act(async () => await result.current.write("world"));
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});

it("returns error when write fails", async () => {
  const error = new Error("write failed");
  writeText.mockImplementationOnce(async () => {
    throw error;
  });

  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);

  await act(async () => await result.current.write("world"));
  await waitFor(() => expect(result.current.error).toEqual(error));
  expect(result.current.text).toEqual("hello");
});

it("recovers from error on any successful write", async () => {
  readText.mockImplementationOnce(async () => {
    throw new Error("fail");
  });

  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.error).not.toEqual(undefined));

  await act(async () => await result.current.write("world"));
  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});
