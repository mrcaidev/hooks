import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../src/use-local-storage";

describe("useLocalStorage", () => {
  describe("without stored value", () => {
    it("works with no options", () => {
      // Initialization.
      const { result } = renderHook(() => useLocalStorage("age"));
      expect(result.current.value).toBeUndefined();

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

    it("works with default value", () => {
      // Initialization.
      const { result } = renderHook(() =>
        useLocalStorage("age", {
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

    it("works with custom (de-)serializer", () => {
      // Initialization.
      const { result } = renderHook(() =>
        useLocalStorage("age", {
          defaultValue: 24,
          serializer: (num) => String(num + 1),
          deserializer: (str) => Number(str) - 1,
        })
      );
      expect(result.current.value).toEqual(24);

      // Set new value.
      act(() => {
        result.current.set(18);
      });
      expect(result.current.value).toEqual(18);
      expect(localStorage.getItem("age")).toEqual("19");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(localStorage.getItem("age")).toBeNull();
    });
  });

  describe("with stored value", () => {
    beforeEach(() => {
      localStorage.setItem("age", "18");
    });

    it("works with no options", () => {
      // Initialized with undefined.
      const { result } = renderHook(() => useLocalStorage("age"));
      expect(result.current.value).toEqual(18);

      // Set new value.
      act(() => {
        result.current.set(24);
      });
      expect(result.current.value).toEqual(24);
      expect(localStorage.getItem("age")).toEqual("24");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(localStorage.getItem("age")).toBeNull();
    });

    it("works with default value", () => {
      // Initialized with undefined.
      const { result } = renderHook(() =>
        useLocalStorage("age", {
          defaultValue: 24,
        })
      );
      expect(result.current.value).toEqual(18);

      // Set new value.
      act(() => {
        result.current.set(24);
      });
      expect(result.current.value).toEqual(24);
      expect(localStorage.getItem("age")).toEqual("24");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(localStorage.getItem("age")).toBeNull();
    });

    it("works with (de-)serializer", () => {
      // Initialized with undefined.
      const { result } = renderHook(() =>
        useLocalStorage("age", {
          defaultValue: 24,
          serializer: (num) => String(num + 1),
          deserializer: (str) => Number(str) - 1,
        })
      );
      expect(result.current.value).toEqual(17);

      // Set new value.
      act(() => {
        result.current.set(24);
      });
      expect(result.current.value).toEqual(24);
      expect(localStorage.getItem("age")).toEqual("25");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(localStorage.getItem("age")).toBeNull();
    });
  });
});
