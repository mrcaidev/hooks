import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useClickOutside } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="outside">
      <div data-testid="container">
        <div data-testid="inside" />
      </div>
    </div>
  `;
});

it("listens to click events outside", () => {
  const outside = screen.getByTestId("outside");
  const container = screen.getByTestId("container");
  const inside = screen.getByTestId("inside");
  const callback = vi.fn();

  renderHook(() => useClickOutside({ current: container }, callback));

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(outside);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.mouseDown(inside);

  expect(callback).toHaveBeenCalledTimes(1);
});

it("responds to dynamic `ref`", () => {
  const outside = screen.getByTestId("outside");
  const container = screen.getByTestId("container");
  const inside = screen.getByTestId("inside");
  const callback = vi.fn();

  const { rerender } = renderHook(
    (element) => useClickOutside({ current: element }, callback),
    { initialProps: null as Element | null },
  );

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(container);

  expect(callback).toHaveBeenCalledTimes(0);

  rerender(inside);

  expect(callback).toHaveBeenCalledTimes(0);

  fireEvent.mouseDown(container);

  expect(callback).toHaveBeenCalledTimes(1);

  rerender(outside);

  expect(callback).toHaveBeenCalledTimes(1);

  fireEvent.mouseDown(container);

  expect(callback).toHaveBeenCalledTimes(1);
});
