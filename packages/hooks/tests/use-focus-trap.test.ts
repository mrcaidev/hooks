import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useFocusTrap } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <button data-testid="first">First</button>
    <button>Middle</button>
    <button data-testid="last">Last</button>
  `;
});

it("traps the focus", () => {
  const first = screen.getByTestId("first");
  const last = screen.getByTestId("last");
  first.focus();

  renderHook(() => useFocusTrap({ current: first }, { current: last }));
  expect(document.activeElement).toEqual(first);

  fireEvent.keyDown(first, { code: "Tab", shiftKey: true });
  expect(document.activeElement).toEqual(last);

  fireEvent.keyDown(last, { code: "Tab" });
  expect(document.activeElement).toEqual(first);
});

it("does not throw on other keydown events", () => {
  const first = screen.getByTestId("first");
  const last = screen.getByTestId("last");
  first.focus();

  renderHook(() => useFocusTrap({ current: first }, { current: last }));
  expect(document.activeElement).toEqual(first);

  fireEvent.keyDown(first, { code: "Enter" });
  expect(document.activeElement).toEqual(first);

  fireEvent.keyDown(last, { code: "Escape" });
  expect(document.activeElement).toEqual(first);
});

it("does not throw with null ref", () => {
  const last = screen.getByTestId("last");
  last.focus();

  renderHook(() => useFocusTrap({ current: null }, { current: null }));
  expect(document.activeElement).toEqual(last);

  fireEvent.keyDown(last, { code: "Tab" });
  expect(document.activeElement).toEqual(last);
});
