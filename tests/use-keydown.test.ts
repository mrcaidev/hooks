import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useKeydown } from "src";

it("listens to keydown events", async () => {
  const user = userEvent.setup();
  const fn = vi.fn();

  renderHook(() => useKeydown("Enter", fn));

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard("[Enter]");

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[Tab]");

  expect(fn).toHaveBeenCalledTimes(1);
});

it("can customize modifier keys", async () => {
  const user = userEvent.setup();
  const fn = vi.fn();

  renderHook(() => useKeydown("Enter", fn, { ctrl: true, shift: true }));

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard("[Enter]");

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard("[ControlLeft>][Enter][/ControlLeft]");

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard("[ShiftLeft>][Enter][/ShiftLeft]");

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard(
    "[ControlLeft>][ShiftLeft>][Enter][/ShiftLeft][/ControlLeft]",
  );

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard(
    "[ControlRight>][ShiftRight>][Enter][/ShiftRight][/ControlRight]",
  );

  expect(fn).toHaveBeenCalledTimes(2);

  await user.keyboard(
    "[ControlLeft>][ShiftLeft>][AltLeft>][Enter][/AltLeft][/ShiftLeft][/ControlLeft]",
  );

  expect(fn).toHaveBeenCalledTimes(2);
});

it("responds to dynamic `key`", async () => {
  const user = userEvent.setup();
  const fn = vi.fn();

  const { rerender } = renderHook((code) => useKeydown(code, fn), {
    initialProps: "Enter",
  });

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard("[Enter]");

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[Tab]");

  expect(fn).toHaveBeenCalledTimes(1);

  rerender("Tab");

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[Enter]");

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[Tab]");

  expect(fn).toHaveBeenCalledTimes(2);
});

it("responds to dynamic `modifierKeys`", async () => {
  const user = userEvent.setup();
  const fn = vi.fn();

  const { rerender } = renderHook((ctrl) => useKeydown("Enter", fn, { ctrl }), {
    initialProps: false,
  });

  expect(fn).toHaveBeenCalledTimes(0);

  await user.keyboard("[Enter]");

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[ControlLeft>][Enter][/ControlLeft]");

  expect(fn).toHaveBeenCalledTimes(1);

  rerender(true);

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[Enter]");

  expect(fn).toHaveBeenCalledTimes(1);

  await user.keyboard("[ControlLeft>][Enter][/ControlLeft]");

  expect(fn).toHaveBeenCalledTimes(2);
});
