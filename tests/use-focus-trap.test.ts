import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useFocusTrap } from "../src/use-focus-trap";

beforeAll(() => {
  document.body.innerHTML = `
    <button data-testid="1">1</button>
    <button data-testid="2">2</button>
    <button data-testid="3">3</button>
  `;
});

describe("useFocusTrap", () => {
  it("correctly sets up and tears down", () => {
    const first = screen.getByTestId("1");
    const last = screen.getByTestId("3");
    const addEventListener = jest.spyOn(document, "addEventListener");
    const removeEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useFocusTrap(first, last));
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("works with element target", () => {
    const first = screen.getByTestId("1");
    const last = screen.getByTestId("3");

    renderHook(() => useFocusTrap(first, last));
    first.focus();
    expect(document.activeElement).toEqual(first);

    fireEvent.keyDown(document, { code: "Tab", shiftKey: true });
    expect(document.activeElement).toEqual(last);

    fireEvent.keyDown(document, { code: "Tab" });
    expect(document.activeElement).toEqual(first);
  });

  it("works with ref target", () => {
    const first = { current: screen.getByTestId("1") };
    const last = { current: screen.getByTestId("3") };

    renderHook(() => useFocusTrap(first, last));
    first.current.focus();
    expect(document.activeElement).toEqual(first.current);

    fireEvent.keyDown(document, { code: "Tab", shiftKey: true });
    expect(document.activeElement).toEqual(last.current);

    fireEvent.keyDown(document, { code: "Tab" });
    expect(document.activeElement).toEqual(first.current);
  });
});
