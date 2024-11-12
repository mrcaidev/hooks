import { act, fireEvent, renderHook, waitFor } from "@testing-library/react";
import { useClipboardText } from "src";

const mockReadText = vi.fn();
const mockWriteText = vi.fn();

beforeAll(() => {
  vi.stubGlobal("navigator", {
    clipboard: {
      readText: mockReadText,
      writeText: mockWriteText,
    },
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("reads clipboard on mount by default", async () => {
  mockReadText.mockResolvedValueOnce("hello");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(1);
});

it("can disable read on mount", async () => {
  const { result } = renderHook(() => useClipboardText({ readOnMount: false }));

  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(0);
});

it("responds to dynamic `readOnMount`", async () => {
  mockReadText.mockResolvedValueOnce("hello");

  const { result, rerender } = renderHook(
    (readOnMount) => useClipboardText({ readOnMount }),
    { initialProps: false },
  );

  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(0);

  rerender(true);

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(1);
});

it("provides `read` function to manually read", async () => {
  mockReadText.mockResolvedValueOnce("hello").mockResolvedValueOnce("world");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  await act(async () => await result.current.read());

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(2);
});

it("returns error if `read` fails", async () => {
  mockReadText.mockRejectedValueOnce(new Error("test"));

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.error).toEqual(new Error("test")));
  expect(result.current.text).toEqual("");
  expect(mockReadText).toHaveBeenCalledTimes(1);
});

it("provides `write` function to manually write", async () => {
  mockReadText.mockResolvedValueOnce("hello");
  mockWriteText.mockResolvedValueOnce(void 0);

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockWriteText).toHaveBeenCalledTimes(0);

  await act(async () => await result.current.write("world"));

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
  expect(mockWriteText).toHaveBeenCalledTimes(1);
});

it("returns error if `write` fails", async () => {
  mockReadText.mockResolvedValueOnce("hello");
  mockWriteText.mockRejectedValueOnce(new Error("test"));

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockWriteText).toHaveBeenCalledTimes(0);

  await act(async () => await result.current.write("world"));

  await waitFor(() => expect(result.current.error).toEqual(new Error("test")));
  expect(result.current.text).toEqual("hello");
  expect(mockWriteText).toHaveBeenCalledTimes(1);
});

it("listens to cut events", async () => {
  mockReadText.mockResolvedValueOnce("hello").mockResolvedValueOnce("world");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  fireEvent.cut(document);

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(2);
});

it("listens to copy events", async () => {
  mockReadText.mockResolvedValueOnce("hello").mockResolvedValueOnce("world");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  fireEvent.copy(document);

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
  expect(mockReadText).toHaveBeenCalledTimes(2);
});

it("recovers from error after any successful read", async () => {
  mockReadText
    .mockRejectedValueOnce(new Error("error"))
    .mockResolvedValueOnce("world");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.error).toEqual(new Error("error")));

  await act(async () => await result.current.read());

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});

it("recovers from error after any successful write", async () => {
  mockReadText.mockRejectedValueOnce(new Error("error"));
  mockWriteText.mockResolvedValueOnce(void 0);

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.error).toEqual(new Error("error")));

  await act(async () => await result.current.write("world"));

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(undefined);
});
