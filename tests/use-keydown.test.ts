import { fireEvent, renderHook } from "@testing-library/react";
import { useKeydown } from "../src/use-keydown";

describe("useKeydown", () => {
  it("invokes callback on target keydown", () => {
    const callback = jest.fn();

    renderHook(() => useKeydown("Tab", callback));
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.documentElement, { code: "Tab" });
    expect(callback).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document.documentElement, { code: "Tab" });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("invokes callback on irrelevant keydown", () => {
    const callback = jest.fn();

    renderHook(() => useKeydown("Tab", callback));
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.documentElement, { code: "Enter" });
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.documentElement, { code: "a" });
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("recognizes modifier keys", () => {
    const callback = jest.fn();

    renderHook(() => useKeydown("Tab", callback, { ctrl: true, shift: true }));
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.documentElement, { code: "Tab" });
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.documentElement, { code: "Tab", ctrlKey: true });
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.documentElement, {
      code: "Tab",
      ctrlKey: true,
      shiftKey: true,
    });
    expect(callback).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document.documentElement, {
      code: "Tab",
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
