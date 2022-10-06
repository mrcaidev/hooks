import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useClickOutside } from "../src/use-click-outside";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="outside">
      <div data-testid="target">
        <div data-testid="inside" />
      </div>
    </div>
  `;
});

describe("useClickOutside", () => {
  it("correctly sets up and tears down", () => {
    const target = screen.getByTestId("target");
    const addEventListener = jest.spyOn(document, "addEventListener");
    const removeEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() =>
      useClickOutside({ current: target }, jest.fn())
    );
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("responds to outside clicks", () => {
    const target = screen.getByTestId("target");
    const outside = screen.getByTestId("outside");
    const fn = jest.fn();

    renderHook(() => useClickOutside({ current: target }, fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(outside);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(outside);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does not respond to inside clicks", () => {
    const target = screen.getByTestId("target");
    const inside = screen.getByTestId("inside");
    const fn = jest.fn();

    renderHook(() => useClickOutside({ current: target }, fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(inside);
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(inside);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
