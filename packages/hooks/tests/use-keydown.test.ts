import { fireEvent, renderHook } from "@testing-library/react";
import { useKeydown } from "src";

it("responds to target keydown", () => {
  const callback = vi.fn();

  renderHook(() => useKeydown("Tab", callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(2);
});

it("does not respond to irrelevant keydown", () => {
  const callback = vi.fn();

  renderHook(() => useKeydown("Tab", callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Enter" });
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Escape" });
  expect(callback).toHaveBeenCalledTimes(0);
});

it("responds to stateful key code", () => {
  const callback = vi.fn();

  const { rerender } = renderHook((code) => useKeydown(code, callback), {
    initialProps: "Tab",
  });
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(1);

  rerender("Enter");
  fireEvent.keyDown(document.body, { code: "Enter" });
  expect(callback).toHaveBeenCalledTimes(2);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(2);
});

it("requires pressed modifier keys to be exactly the same", () => {
  const callback = vi.fn();

  renderHook(() => useKeydown("Tab", callback, { ctrl: true, shift: true }));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Tab", ctrlKey: true });
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, {
    code: "Tab",
    ctrlKey: true,
    shiftKey: true,
  });
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(document.body, {
    code: "Tab",
    ctrlKey: true,
    shiftKey: true,
    altKey: true,
  });
  expect(callback).toHaveBeenCalledTimes(1);
});

it("responds to stateful modifier keys", () => {
  const callback = vi.fn();

  const { rerender } = renderHook(
    (ctrl) => useKeydown("Tab", callback, { ctrl }),
    { initialProps: false }
  );
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(1);

  rerender(true);
  fireEvent.keyDown(document.body, { code: "Tab", ctrlKey: true });
  expect(callback).toHaveBeenCalledTimes(2);

  fireEvent.keyDown(document.body, { code: "Tab" });
  expect(callback).toHaveBeenCalledTimes(2);
});
