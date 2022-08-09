import { fireEvent, renderHook } from "@testing-library/react";
import { useKeydown } from "../src/use-keydown";

describe("useKeydown", () => {
  it("correctly sets up and tears down", () => {
    const addEventListener = jest.spyOn(document, "addEventListener");
    const removeEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useKeydown("Tab", () => {}));
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("responds to target keydown", () => {
    const listener = jest.fn();

    renderHook(() => useKeydown("Tab", listener));
    expect(listener).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Tab" });
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document.body, { code: "Tab" });
    expect(listener).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(document.body, { code: "Enter" });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("recognizes modifier keys", () => {
    const listener = jest.fn();

    renderHook(() => useKeydown("Tab", listener, { ctrl: true, shift: true }));
    expect(listener).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Tab" });
    expect(listener).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, { code: "Tab", ctrlKey: true });
    expect(listener).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document.body, {
      code: "Tab",
      ctrlKey: true,
      shiftKey: true,
    });
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document.body, {
      code: "Tab",
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
