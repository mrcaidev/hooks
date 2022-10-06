import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useFocusTrap } from "../src/use-focus-trap";

beforeAll(() => {
  document.body.innerHTML = `
    <button data-testid="first">First</button>
    <button>Middle</button>
    <button data-testid="last">Last</button>
  `;
});

describe("useFocusTrap", () => {
  it("correctly sets up and tears down", () => {
    const first = screen.getByTestId("first");
    const last = screen.getByTestId("last");
    const addEventListener = jest.spyOn(document, "addEventListener");
    const removeEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() =>
      useFocusTrap({ current: first }, { current: last })
    );
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("traps the focus", () => {
    const first = screen.getByTestId("first");
    const last = screen.getByTestId("last");

    renderHook(() => useFocusTrap({ current: first }, { current: last }));
    first.focus();
    expect(document.activeElement).toEqual(first);

    fireEvent.keyDown(document, { code: "Tab", shiftKey: true });
    expect(document.activeElement).toEqual(last);

    fireEvent.keyDown(document, { code: "Tab" });
    expect(document.activeElement).toEqual(first);
  });
});
