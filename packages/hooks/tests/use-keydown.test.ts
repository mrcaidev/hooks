import { fireEvent, renderHook } from "@testing-library/react";
import { useKeydown } from "src/use-keydown";

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
  const fn = vi.fn();

  renderHook(() => useKeydown("Tab", fn));
  expect(fn).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Enter" });
  expect(fn).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(document.body, { code: "Escape" });
  expect(fn).toHaveBeenCalledTimes(0);
});

it("recognizes modifier keys", () => {
  const fn = vi.fn();

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
