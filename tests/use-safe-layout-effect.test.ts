import { renderHook, screen } from "@testing-library/react";
import { useSafeLayoutEffect } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target"></div>
  `;
});

it("runs exactly as useLayoutEffect", () => {
  const target = screen.getByTestId("target");

  renderHook(() =>
    useSafeLayoutEffect(() => {
      target.innerHTML = "foo";
    }),
  );
  expect(target.innerHTML).toEqual("foo");
});
