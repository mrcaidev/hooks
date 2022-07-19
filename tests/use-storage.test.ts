import { act, renderHook } from "@testing-library/react";
import { useStorage } from "../src/use-storage";

describe("useStorage", () => {
  it("works for local storage", () => {
    // Initialization.
    const { result } = renderHook(() =>
      useStorage("age", {
        storage: localStorage,
        defaultValue: 24,
      })
    );
    expect(result.current.value).toEqual(24);

    // Set new value.
    act(() => {
      result.current.set(18);
    });
    expect(result.current.value).toEqual(18);
    expect(localStorage.getItem("age")).toEqual("18");

    // Clear value.
    act(() => {
      result.current.remove();
    });
    expect(result.current.value).toEqual(undefined);
    expect(localStorage.getItem("age")).toBeNull();
  });

  it("works for session storage", () => {
    // Initialization.
    const { result } = renderHook(() =>
      useStorage("age", {
        storage: sessionStorage,
        defaultValue: 24,
      })
    );
    expect(result.current.value).toEqual(24);

    // Set new value.
    act(() => {
      result.current.set(18);
    });
    expect(result.current.value).toEqual(18);
    expect(sessionStorage.getItem("age")).toEqual("18");

    // Clear value.
    act(() => {
      result.current.remove();
    });
    expect(result.current.value).toEqual(undefined);
    expect(sessionStorage.getItem("age")).toBeNull();
  });
});
