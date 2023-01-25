import { renderHook } from "@testing-library/react";
import { useDocument } from "src/use-document";

it("returns document", () => {
  const { result } = renderHook(() => useDocument());
  expect(result.current.current).toEqual(document);
});
