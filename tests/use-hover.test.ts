import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useHover } from "../src/use-hover";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target">
  `;
});

describe("useHover", () => {
  it("correctly sets up and tears down", () => {
    const ref = { current: screen.getByTestId("target") };
    const addEventListener = jest.spyOn(ref.current, "addEventListener");
    const removeEventListener = jest.spyOn(ref.current, "removeEventListener");

    const { result, unmount } = renderHook(() => useHover(ref));
    expect(result.current).toBe(false);
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });

  it("responds to hover state changes", () => {
    const ref = { current: screen.getByTestId("target") };

    const { result } = renderHook(() => useHover(ref));
    expect(result.current).toEqual(false);

    fireEvent.mouseEnter(ref.current);
    expect(result.current).toEqual(true);

    fireEvent.mouseLeave(ref.current);
    expect(result.current).toEqual(false);
  });
});
