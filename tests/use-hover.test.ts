import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useHover } from "../src/use-hover";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target">
  `;
});

describe("useHover", () => {
  it("correctly sets up and tears down", () => {
    const target = screen.getByTestId("target");
    const addEventListener = jest.spyOn(target, "addEventListener");
    const removeEventListener = jest.spyOn(target, "removeEventListener");

    const { result, unmount } = renderHook(() => useHover(target));
    expect(result.current).toBe(false);
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(0);

    unmount();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });

  it("works with element target", () => {
    const target = screen.getByTestId("target");
    const onEnter = jest.fn();
    const onLeave = jest.fn();
    const onToggle = jest.fn();

    const { result } = renderHook(() =>
      useHover(target, { onEnter, onLeave, onToggle })
    );
    expect(result.current).toEqual(false);
    expect(onEnter).toHaveBeenCalledTimes(0);
    expect(onLeave).toHaveBeenCalledTimes(0);
    expect(onToggle).toHaveBeenCalledTimes(0);

    fireEvent.mouseEnter(target);
    expect(result.current).toEqual(true);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onLeave).toHaveBeenCalledTimes(0);
    expect(onToggle).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(target);
    expect(result.current).toEqual(false);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onLeave).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it("works with ref target", () => {
    const target = { current: screen.getByTestId("target") };
    const onEnter = jest.fn();
    const onLeave = jest.fn();
    const onToggle = jest.fn();

    const { result } = renderHook(() =>
      useHover(target, { onEnter, onLeave, onToggle })
    );
    expect(result.current).toEqual(false);
    expect(onEnter).toHaveBeenCalledTimes(0);
    expect(onLeave).toHaveBeenCalledTimes(0);
    expect(onToggle).toHaveBeenCalledTimes(0);

    fireEvent.mouseEnter(target.current);
    expect(result.current).toEqual(true);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onLeave).toHaveBeenCalledTimes(0);
    expect(onToggle).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(target.current);
    expect(result.current).toEqual(false);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onLeave).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(2);
  });
});
