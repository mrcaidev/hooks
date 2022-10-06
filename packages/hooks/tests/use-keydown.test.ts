import { fireEvent, renderHook } from "@testing-library/react";
import { useKeydown } from "../src/use-keydown";

describe("useKeydown", () => {
  it("correctly sets up and tears down", () => {
    const addEventListener = jest.spyOn(document, "addEventListener");
    const removeEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useKeydown("Tab", jest.fn()));
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("responds to target keydown", () => {
    const fn = jest.fn();

    renderHook(() => useKeydown("Tab", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Tab" });
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document.body, { code: "Tab" });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does not respond to irrelevant keydown", () => {
    const fn = jest.fn();

    renderHook(() => useKeydown("Tab", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Enter" });
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Escape" });
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("recognizes modifier keys", () => {
    const fn = jest.fn();

    renderHook(() => useKeydown("Tab", fn, { ctrl: true, shift: true }));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Tab" });
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Tab", ctrlKey: true });
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, {
      code: "Tab",
      ctrlKey: true,
      shiftKey: true,
    });
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document.body, {
      code: "Tab",
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
