import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <button data-testid="first">First</button>
    <button data-testid="middle">Middle</button>
    <button data-testid="last">Last</button>
  `;
});

it("traps the focus", async () => {
  const user = userEvent.setup();
  const first = screen.getByTestId("first");
  const middle = screen.getByTestId("middle");
  const last = screen.getByTestId("last");
  first.focus();

  renderHook(() => useFocusTrap({ current: first }, { current: last }));

  expect(document.activeElement).toEqual(first);

  await user.tab();

  expect(document.activeElement).toEqual(middle);

  await user.tab();

  expect(document.activeElement).toEqual(last);

  await user.tab();

  expect(document.activeElement).toEqual(first);

  await user.tab({ shift: true });

  expect(document.activeElement).toEqual(last);

  await user.tab({ shift: true });

  expect(document.activeElement).toEqual(middle);

  await user.tab({ shift: true });

  expect(document.activeElement).toEqual(first);
});

it("responds to dynamic `ref`", async () => {
  const user = userEvent.setup();
  const first = screen.getByTestId("first");
  const middle = screen.getByTestId("middle");
  const last = screen.getByTestId("last");
  first.focus();

  const { rerender } = renderHook(
    ({ first, last }) => useFocusTrap({ current: first }, { current: last }),
    { initialProps: { first, last } },
  );

  expect(document.activeElement).toEqual(first);

  await user.tab({ shift: true });

  expect(document.activeElement).toEqual(last);

  rerender({ first: middle, last });

  expect(document.activeElement).toEqual(last);

  await user.tab();

  expect(document.activeElement).toEqual(middle);
});
