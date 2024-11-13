import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

it("listens to click events outside", async () => {
  const user = userEvent.setup();
  const outside = screen.getByTestId("outside");
  const container = screen.getByTestId("container");
  const inside = screen.getByTestId("inside");
  const callback = vi.fn();

  renderHook(() => useClickOutside({ current: container }, callback));

  expect(callback).toHaveBeenCalledTimes(0);

  await user.click(outside);

  expect(callback).toHaveBeenCalledTimes(1);

  await user.click(inside);

  expect(callback).toHaveBeenCalledTimes(1);
});

it("responds to dynamic `ref`", async () => {
  const user = userEvent.setup();
  const outside = screen.getByTestId("outside");
  const container = screen.getByTestId("container");
  const inside = screen.getByTestId("inside");
  const callback = vi.fn();

  const { rerender } = renderHook(
    (element) => useClickOutside({ current: element }, callback),
    { initialProps: null as Element | null },
  );

  expect(callback).toHaveBeenCalledTimes(0);

  await user.click(container);

  expect(callback).toHaveBeenCalledTimes(0);

  rerender(inside);

  expect(callback).toHaveBeenCalledTimes(0);

  await user.click(container);

  expect(callback).toHaveBeenCalledTimes(1);

  rerender(outside);

  expect(callback).toHaveBeenCalledTimes(1);

  await user.click(container);

  expect(callback).toHaveBeenCalledTimes(1);
});
