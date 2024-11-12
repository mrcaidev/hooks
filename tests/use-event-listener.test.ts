import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useEventListener } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target" />
  `;
});

it("listens to element events", () => {
  const target = screen.getByTestId("target");
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: target }, "click", callback));

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(target);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), target);

  fireEvent.click(target);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), target);
});

it("listens to document events", () => {
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: document }, "click", callback));

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), document);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), document);
});

it("listens to window events", () => {
  const callback = vi.fn();

  renderHook(() => useEventListener({ current: window }, "click", callback));

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(window);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), window);

  fireEvent.click(window);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), window);
});

it("responds to dynamic `ref`", () => {
  const target = screen.getByTestId("target");
  const callback = vi.fn();

  const { rerender } = renderHook(
    (node) => useEventListener({ current: node }, "click", callback),
    { initialProps: null as Node | null },
  );

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(0);

  rerender(document);

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), document);

  rerender(target);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(target);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), target);
});

it("responds to dynamic `type`", () => {
  const callback = vi.fn();

  const { rerender } = renderHook(
    (type) => useEventListener({ current: document }, type, callback),
    { initialProps: "click" as keyof DocumentEventMap },
  );

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenLastCalledWith(expect.any(MouseEvent), document);

  rerender("keydown");

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(document);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenLastCalledWith(
    expect.any(KeyboardEvent),
    document,
  );
});

it("responds to dynamic `capture`", () => {
  const target = screen.getByTestId("target");
  const callOrder: string[] = [];
  const documentCallback = vi.fn(() => callOrder.push("document"));
  const targetCallback = vi.fn(() => callOrder.push("target"));

  renderHook(() =>
    useEventListener({ current: target }, "click", targetCallback),
  );
  const { rerender } = renderHook(
    (capture) =>
      useEventListener({ current: document }, "click", documentCallback, {
        capture,
      }),
    { initialProps: false },
  );

  expect(documentCallback).toHaveBeenCalledTimes(0);
  expect(targetCallback).toHaveBeenCalledTimes(0);
  expect(callOrder).toEqual([]);

  fireEvent.click(target);

  expect(documentCallback).toHaveBeenCalledTimes(1);
  expect(targetCallback).toHaveBeenCalledTimes(1);
  expect(callOrder).toEqual(["target", "document"]);

  rerender(true);

  expect(documentCallback).toHaveBeenCalledTimes(1);
  expect(targetCallback).toHaveBeenCalledTimes(1);
  expect(callOrder).toEqual(["target", "document"]);

  fireEvent.click(target);

  expect(documentCallback).toHaveBeenCalledTimes(2);
  expect(targetCallback).toHaveBeenCalledTimes(2);
  expect(callOrder).toEqual(["target", "document", "document", "target"]);
});

it("responds to dynamic `passive`", () => {
  const callback = vi.fn((event: MouseEvent) => event.preventDefault());

  const { rerender } = renderHook(
    (passive) =>
      useEventListener({ current: document }, "click", callback, { passive }),
    { initialProps: false },
  );

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);

  rerender(true);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toThrow();
});

it("responds to dynamic `once`", () => {
  const callback = vi.fn();

  const { rerender } = renderHook(
    (once) =>
      useEventListener({ current: document }, "click", callback, { once }),
    { initialProps: true },
  );

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);

  rerender(false);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(2);
});

it("responds to dynamic `extraDeps`", () => {
  const history: number[] = [];
  const callback = vi.fn((numbers: number[]) => history.push(...numbers));

  const { rerender } = renderHook(
    (extraDeps) =>
      useEventListener(
        { current: document },
        "click",
        () => callback(extraDeps),
        { extraDeps },
      ),
    { initialProps: [1, 2] },
  );

  expect(callback).toHaveBeenCalledTimes(0);
  expect(history).toEqual([]);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(history).toEqual([1, 2]);

  rerender([1, 3]);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(history).toEqual([1, 2]);

  fireEvent.click(document);

  expect(callback).toHaveBeenCalledTimes(2);
  expect(history).toEqual([1, 2, 1, 3]);
});
