import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useClickOutside } from "src/use-click-outside";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="outside">
      <div data-testid="container">
        <div data-testid="inside" />
      </div>
    </div>
  `;
});

it("responds to clicks outside", () => {
  const container = screen.getByTestId("container");
  const outside = screen.getByTestId("outside");
  const callback = vi.fn();

  renderHook(() => useClickOutside({ current: container }, callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(outside);
  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.mouseDown(outside);
  expect(callback).toHaveBeenCalledTimes(2);
});

it("does not respond to clicks inside", () => {
  const container = screen.getByTestId("container");
  const inside = screen.getByTestId("inside");
  const callback = vi.fn();

  renderHook(() => useClickOutside({ current: container }, callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(inside);
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(inside);
  expect(callback).toHaveBeenCalledTimes(0);
});

it("does not throw with null ref", () => {
  const outside = screen.getByTestId("outside");
  const inside = screen.getByTestId("inside");
  const callback = vi.fn();

  renderHook(() => useClickOutside({ current: null }, callback));
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(inside);
  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(outside);
  expect(callback).toHaveBeenCalledTimes(0);
});
