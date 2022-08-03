import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../src/use-counter";

describe("useCounter", () => {
  it("sets up correctly", () => {
    const { result: resultA } = renderHook(() => useCounter());
    expect(resultA.current.count).toEqual(0);

    const { result: resultB } = renderHook(() => useCounter(1));
    expect(resultB.current.count).toEqual(1);
  });

  it("can set arbitrary value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toEqual(0);

    act(() => result.current.set(1));
    expect(result.current.count).toEqual(1);
  });

  it("can increment by 1", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toEqual(0);

    act(() => result.current.increment());
    expect(result.current.count).toEqual(1);
  });

  it("can increment by a specific value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toEqual(0);

    act(() => result.current.incrementBy(2));
    expect(result.current.count).toEqual(2);
  });

  it("can decrement by 1", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toEqual(0);

    act(() => result.current.decrement());
    expect(result.current.count).toEqual(-1);
  });

  it("can decrement by a specific value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toEqual(0);

    act(() => result.current.decrementBy(2));
    expect(result.current.count).toEqual(-2);
  });

  it("can reset to initial value", () => {
    const { result } = renderHook(() => useCounter(1));
    expect(result.current.count).toEqual(1);

    act(() => result.current.increment());
    expect(result.current.count).toEqual(2);

    act(() => result.current.reset());
    expect(result.current.count).toEqual(1);
  });
});
