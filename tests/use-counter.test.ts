import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../src/use-counter";

describe("useCounter", () => {
  it("can receive initial value", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toEqual(3);
  });

  it("can set arbitrary value", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setCount(3);
    });
    expect(result.current.count).toEqual(3);
  });

  it("can increment by 1", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toEqual(1);
  });

  it("can increment by a specific value", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.incrementBy(2);
    });
    expect(result.current.count).toEqual(2);
  });

  it("can decrement by 1", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toEqual(-1);
  });

  it("can decrement by a specific value", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.decrementBy(2);
    });
    expect(result.current.count).toEqual(-2);
  });

  it("can reset to initial value", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.count).toEqual(3);
  });

  it("can reset to 0", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.resetToZero();
    });
    expect(result.current.count).toEqual(0);
  });
});
