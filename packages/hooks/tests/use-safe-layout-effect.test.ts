import { renderHook, screen } from "@testing-library/react";
import { useSafeLayoutEffect } from "../src/use-safe-layout-effect";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target"></div>
  `;
});

describe("useSafeLayoutEffect", () => {
  it("runs exactly as useLayoutEffect", () => {
    const target = screen.getByTestId("target");
    renderHook(() =>
      useSafeLayoutEffect(() => {
        target.innerHTML = "foo";
      })
    );
    expect(target.innerHTML).toEqual("foo");
  });
});
