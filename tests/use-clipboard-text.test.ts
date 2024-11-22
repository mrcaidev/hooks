import { act, fireEvent, renderHook, waitFor } from "@testing-library/react";
import { useClipboardText } from "src";

const mockReadText = vi.fn();
const mockWriteText = vi.fn();
const mockVisibilityState = vi.spyOn(document, "visibilityState", "get");

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
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(1);
});

it("can disable read on mount", async () => {
  const { result } = renderHook(() => useClipboardText({ readOnMount: false }));

  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(0);
});

it("responds to dynamic `readOnMount`", async () => {
  mockReadText.mockResolvedValueOnce("hello");

  const { result, rerender } = renderHook(
    (readOnMount) => useClipboardText({ readOnMount }),
    { initialProps: false },
  );

  expect(result.current.text).toEqual("");
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(0);

  rerender(true);

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(1);
});

it("provides `write` function to manually write", async () => {
  mockReadText.mockResolvedValueOnce("hello");
  mockWriteText.mockResolvedValueOnce(void 0);

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(null);
  expect(mockWriteText).toHaveBeenCalledTimes(0);

  await act(async () => await result.current.write("world"));

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(null);
  expect(mockWriteText).toHaveBeenCalledTimes(1);
});

it("returns error if `write` fails", async () => {
  mockReadText.mockResolvedValueOnce("hello");
  mockWriteText.mockRejectedValueOnce(new Error("test"));

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(null);
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
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  fireEvent.cut(document);

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(2);
});

it("listens to copy events", async () => {
  mockReadText.mockResolvedValueOnce("hello").mockResolvedValueOnce("world");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.text).toEqual("hello"));
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  fireEvent.copy(document);

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(2);
});

it("refreshes clipboard text when the user goes back to the tab", async () => {
  mockReadText.mockResolvedValueOnce("hello").mockResolvedValueOnce("world");
  mockVisibilityState.mockReturnValue("visible");

  const { result } = renderHook(() => useClipboardText());
  await waitFor(() => expect(result.current.text).not.toEqual(""));

  expect(result.current.text).toEqual("hello");
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  mockVisibilityState.mockReturnValue("hidden");
  await act(async () => fireEvent(document, new Event("visibilitychange")));

  expect(result.current.text).toEqual("hello");
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(1);

  mockVisibilityState.mockReturnValue("visible");
  await act(async () => fireEvent(document, new Event("visibilitychange")));

  expect(result.current.text).toEqual("world");
  expect(result.current.error).toEqual(null);
  expect(mockReadText).toHaveBeenCalledTimes(2);
});

it("recovers from error after any successful read", async () => {
  mockReadText
    .mockRejectedValueOnce(new Error("error"))
    .mockResolvedValueOnce("world");

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.error).toEqual(new Error("error")));

  fireEvent.copy(document);

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(null);
});

it("recovers from error after any successful write", async () => {
  mockReadText.mockRejectedValueOnce(new Error("error"));
  mockWriteText.mockResolvedValueOnce(void 0);

  const { result } = renderHook(() => useClipboardText());

  await waitFor(() => expect(result.current.error).toEqual(new Error("error")));

  await act(async () => await result.current.write("world"));

  await waitFor(() => expect(result.current.text).toEqual("world"));
  expect(result.current.error).toEqual(null);
});
