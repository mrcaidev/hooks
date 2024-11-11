import { renderHook, screen } from "@testing-library/react";
import { useElementSize } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <textarea></textarea>
  `;

  vi.stubGlobal("ResizeObserver", function (this: Record<string, unknown>) {
    this["observe"] = () => 0;
    this["disconnect"] = () => 0;
  });
});
afterAll(() => {
  vi.unstubAllGlobals();
});

it("reads the size of element", () => {
  const target = screen.getByRole("textbox");
  const { result } = renderHook(() => useElementSize({ current: target }));
  expect(result.current.width).not.toEqual(undefined);
  expect(result.current.height).not.toEqual(undefined);
});

it("does not throw with null ref", () => {
  const { result } = renderHook(() => useElementSize({ current: null }));
  expect(result.current.width).not.toEqual(undefined);
  expect(result.current.height).not.toEqual(undefined);
});
