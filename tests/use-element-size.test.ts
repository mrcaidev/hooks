import { renderHook, screen } from "@testing-library/react";
import { useElementSize } from "src";

const mockClientWidth = vi.spyOn(
  window.Element.prototype,
  "clientWidth",
  "get",
);
const mockClientHeight = vi.spyOn(
  window.Element.prototype,
  "clientHeight",
  "get",
);

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target" />
  `;

  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(private callback: ResizeObserverCallback) {}

      observe(target: Element) {
        this.callback([{ target } as ResizeObserverEntry], this);
      }

      disconnect() {}
      unobserve() {}
    },
  );
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("reads the size of element", () => {
  mockClientWidth
    .mockReturnValueOnce(200)
    .mockReturnValueOnce(200)
    .mockReturnValueOnce(200);
  mockClientHeight
    .mockReturnValueOnce(100)
    .mockReturnValueOnce(100)
    .mockReturnValueOnce(100);
  const target = screen.getByTestId("target");

  const { result } = renderHook(() => useElementSize({ current: target }));

  expect(result.current.width).toEqual(200);
  expect(result.current.height).toEqual(100);
});

it.todo("listens to resize events", () => {});
