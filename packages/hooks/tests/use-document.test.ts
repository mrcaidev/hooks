import { renderHook } from "@testing-library/react";
import { useDocument } from "src/use-document";

describe("useDocument", () => {
  it("can correctly set up and tear down", () => {
    const { result } = renderHook(() => useDocument());
    expect(result.current.current).toEqual(document);
  });
});
