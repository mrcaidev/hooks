import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHover } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target" />
  `;
});

it("listens to hover events", async () => {
  const user = userEvent.setup();
  const target = screen.getByTestId("target");

  const { result } = renderHook(() => useHover({ current: target }));

  expect(result.current).toEqual(false);

  await user.hover(target);

  expect(result.current).toEqual(true);

  await user.unhover(target);

  expect(result.current).toEqual(false);
});

it("responds to dynamic `ref`", async () => {
  const user = userEvent.setup();
  const target = screen.getByTestId("target");

  const { result, rerender } = renderHook(
    (element) => useHover({ current: element }),
    { initialProps: null as HTMLElement | null },
  );

  expect(result.current).toEqual(false);

  await user.hover(target);

  expect(result.current).toEqual(false);

  await user.unhover(target);

  expect(result.current).toEqual(false);

  rerender(target);

  expect(result.current).toEqual(false);

  await user.hover(target);

  expect(result.current).toEqual(true);

  await user.unhover(target);

  expect(result.current).toEqual(false);
});
