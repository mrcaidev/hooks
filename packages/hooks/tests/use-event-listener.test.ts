import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useEventListener } from "src/use-event-listener";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target" />
  `;
});

describe("useEventListener", () => {
  it("correctly sets up and tears down", () => {
    const addEventListener = vi.spyOn(document, "addEventListener");
    const removeEventListener = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() =>
      useEventListener({ current: document }, "click", vi.fn())
    );
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("responds to document events", () => {
    const fn = vi.fn();

    renderHook(() => useEventListener({ current: document }, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(document.body);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(document.body);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("responds to element events", () => {
    const target = screen.getByTestId("target");
    const fn = vi.fn();

    renderHook(() => useEventListener({ current: target }, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(target);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(target);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("responds to window events", () => {
    const fn = vi.fn();

    renderHook(() => useEventListener({ current: window }, "click", fn));
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(window);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(window);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("works with capture option", () => {
    const target = screen.getByTestId("target");
    const callOrder: string[] = [];
    const documentFn = vi.fn(() => callOrder.push("document"));
    const targetFn = vi.fn(() => callOrder.push("ref"));

    renderHook(() =>
      useEventListener({ current: document }, "click", documentFn, {
        capture: true,
      })
    );
    renderHook(() => useEventListener({ current: target }, "click", targetFn));
    expect(documentFn).toHaveBeenCalledTimes(0);
    expect(targetFn).toHaveBeenCalledTimes(0);
    expect(callOrder).toEqual([]);

    fireEvent.click(target);
    expect(documentFn).toHaveBeenCalledTimes(1);
    expect(targetFn).toHaveBeenCalledTimes(1);
    expect(callOrder).toEqual(["document", "ref"]);
  });

  it("works with passive option", () => {
    const fn = vi.fn((e: MouseEvent) => e.preventDefault());

    renderHook(() =>
      useEventListener({ current: document }, "click", fn, { passive: true })
    );
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(document.body);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toThrow();
  });

  it("works with once option", () => {
    const fn = vi.fn();

    renderHook(() =>
      useEventListener({ current: document }, "click", fn, { once: true })
    );
    expect(fn).toHaveBeenCalledTimes(0);

    fireEvent.click(document.body);
    expect(fn).toHaveBeenCalledTimes(1);

    fireEvent.click(document.body);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
