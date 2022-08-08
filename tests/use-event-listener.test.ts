import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useEventListener } from "../src/use-event-listener";

beforeAll(() => {
  document.body.innerHTML = `
    <button>Click</button>
  `;
});

describe("useEventListener", () => {
  it("correctly sets up and tears down", () => {
    const addEventListener = jest.spyOn(document, "addEventListener");
    const removeEventListener = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() =>
      useEventListener(document, "click", () => {})
    );
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("works with document target", () => {
    const fn = jest.fn();

    renderHook(() => useEventListener(document, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(document);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(document);
    expect(fn).toHaveBeenCalledTimes(2);

    fireEvent.focus(document);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("works with element target", () => {
    const fn = jest.fn();
    const button = screen.getByRole("button");

    renderHook(() => useEventListener(button, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(2);

    fireEvent.focus(button);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("works with window target", () => {
    const fn = jest.fn();

    renderHook(() => useEventListener(window, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(window);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(window);
    expect(fn).toHaveBeenCalledTimes(2);

    fireEvent.focus(window);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("works with ref target", () => {
    const fn = jest.fn();
    const ref = { current: screen.getByRole("button") };

    renderHook(() => useEventListener(ref, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(ref.current);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(ref.current);
    expect(fn).toHaveBeenCalledTimes(2);

    fireEvent.focus(ref.current);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("works with capture option", () => {
    const callOrder: string[] = [];
    const documentFn = jest.fn(() => callOrder.push("document"));
    const buttonFn = jest.fn(() => callOrder.push("button"));
    const button = screen.getByRole("button");

    renderHook(() =>
      useEventListener(document, "click", documentFn, { capture: true })
    );
    renderHook(() => useEventListener(button, "click", buttonFn));
    expect(documentFn).toHaveBeenCalledTimes(0);
    expect(buttonFn).toHaveBeenCalledTimes(0);
    expect(callOrder).toEqual([]);

    fireEvent.click(button);
    expect(documentFn).toHaveBeenCalledTimes(1);
    expect(buttonFn).toHaveBeenCalledTimes(1);
    expect(callOrder).toEqual(["document", "button"]);
  });

  it("works with passive option", () => {
    const fn = jest.fn((e: MouseEvent) => e.preventDefault());

    renderHook(() =>
      useEventListener(document, "click", fn, { passive: true })
    );
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(document);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toThrowError();
  });

  it("works with once option", () => {
    const fn = jest.fn();

    renderHook(() => useEventListener(document, "click", fn, { once: true }));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(document);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(document);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
