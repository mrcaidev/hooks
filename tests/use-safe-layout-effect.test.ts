import { renderHook, screen } from "@testing-library/react";
import { useSafeLayoutEffect } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target" />
  `;
});

it("is exactly same as `useLayoutEffect`", () => {
  const target = screen.getByTestId("target");

  renderHook(() =>
    useSafeLayoutEffect(() => {
      target.innerHTML = "foo";
    }),
  );

  expect(target.innerHTML).toEqual("foo");
});
