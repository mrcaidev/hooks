import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useHover } from "src/use-hover";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target">
  `;
});

describe("useHover", () => {
  it("correctly sets up and tears down", () => {
    const target = screen.getByTestId("target");
    const addEventListener = vi.spyOn(target, "addEventListener");
    const removeEventListener = vi.spyOn(target, "removeEventListener");

    const { result, unmount } = renderHook(() => useHover({ current: target }));
    expect(result.current).toBe(false);
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });

  it("responds to hover state changes", () => {
    const target = screen.getByTestId("target");

    const { result } = renderHook(() => useHover({ current: target }));
    expect(result.current).toEqual(false);

    fireEvent.mouseEnter(target);
    expect(result.current).toEqual(true);

    fireEvent.mouseLeave(target);
    expect(result.current).toEqual(false);
  });
});
