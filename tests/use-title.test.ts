import { act, renderHook } from "@testing-library/react";
import { useTitle } from "src";

it("returns title", async () => {
  await act(async () => (document.title = "hello"));

  const { result } = renderHook(() => useTitle());

  expect(result.current).toEqual("hello");

  await act(async () => (document.title = "world"));

  expect(result.current).toEqual("world");
});
