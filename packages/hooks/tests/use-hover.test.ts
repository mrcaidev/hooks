import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useHover } from "src/use-hover";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target">
  `;
});

it("responds to hover events", () => {
  const target = screen.getByTestId("target");

  const { result } = renderHook(() => useHover({ current: target }));
  expect(result.current).toEqual(false);

  fireEvent.mouseEnter(target);
  expect(result.current).toEqual(true);

  fireEvent.mouseLeave(target);
  expect(result.current).toEqual(false);
});

it("does not throw with null ref", () => {
  const target = screen.getByTestId("target");

  const { result } = renderHook(() => useHover({ current: null }));
  expect(result.current).toEqual(false);

  fireEvent.mouseEnter(target);
  expect(result.current).toEqual(false);

  fireEvent.mouseLeave(target);
  expect(result.current).toEqual(false);
});
