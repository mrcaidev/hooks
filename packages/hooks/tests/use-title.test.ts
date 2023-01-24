import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useTitle } from "src/use-title";

describe("useTitle", () => {
  it("correctly sets up and tears down", () => {
    renderHook(() => useTitle("1"));
    expect(document.title).toEqual("1");
  });

  it("can respond to stateful title", () => {
    const { result } = renderHook(() => {
      const [title, setTitle] = useState("1");
      useTitle(title);
      return { setTitle };
    });
    expect(document.title).toEqual("1");

    act(() => result.current.setTitle("2"));
    expect(document.title).toEqual("2");
  });
});
