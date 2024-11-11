import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useEventListener } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target" />
  `;
});

it("responds to document events", () => {
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: document }, "click", callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(2);
});

it("responds to element events", () => {
  const target = screen.getByTestId("target");
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: target }, "click", callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(target);
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(target);
  expect(callback).toHaveBeenCalledTimes(2);
});

it("responds to window events", () => {
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: window }, "click", callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(window);
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(window);
  expect(callback).toHaveBeenCalledTimes(2);
});

it("does not throw with null ref", () => {
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: null }, "click", callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(0);
});

it("responds to stateful event type", () => {
  const callback = vi.fn();

  const { rerender } = renderHook(
    (type) => useEventListener({ current: document }, type, callback),
    { initialProps: "click" as keyof DocumentEventMap },
  );
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(1);

  rerender("keydown");
  fireEvent.keyDown(document.body);
  expect(callback).toHaveBeenCalledTimes(2);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(2);
});

it.skip("works with capture option", () => {
  const target = screen.getByTestId("target");
  const callOrder: string[] = [];
  const documentCallback = vi.fn(() => callOrder.push("document"));
  const targetCallback = vi.fn(() => callOrder.push("target"));

  renderHook(() =>
    useEventListener({ current: document }, "click", documentCallback, {
      capture: true,
    }),
  );
  renderHook(() =>
    useEventListener({ current: target }, "click", targetCallback),
  );
  expect(documentCallback).toHaveBeenCalledTimes(0);
  expect(targetCallback).toHaveBeenCalledTimes(0);
  expect(callOrder).toEqual([]);

  fireEvent.click(target);
  expect(documentCallback).toHaveBeenCalledTimes(1);
  expect(targetCallback).toHaveBeenCalledTimes(1);
  expect(callOrder).toEqual(["document", "target"]);
});

it.skip("works with passive option", () => {
  const callback = vi.fn((e: MouseEvent) => e.preventDefault());

  renderHook(() =>
    useEventListener({ current: document }, "click", callback, {
      passive: true,
    }),
  );
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toThrow();
});

it.skip("works with once option", () => {
  const callback = vi.fn();

  renderHook(() =>
    useEventListener({ current: document }, "click", callback, { once: true }),
  );
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(1);
});
