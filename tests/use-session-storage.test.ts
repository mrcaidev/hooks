import { act, renderHook } from "@testing-library/react";
import { useSessionStorage } from "../src/use-session-storage";

describe("useSessionStorage", () => {
  describe("without stored value", () => {
    it("works with no options", () => {
      // Initialization.
      const { result } = renderHook(() => useSessionStorage("age"));
      expect(result.current.value).toBeUndefined();

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

    it("works with default value", () => {
      // Initialization.
      const { result } = renderHook(() =>
        useSessionStorage("age", {
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

    it("works with custom (de-)serializer", () => {
      // Initialization.
      const { result } = renderHook(() =>
        useSessionStorage("age", {
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
      expect(sessionStorage.getItem("age")).toEqual("19");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(sessionStorage.getItem("age")).toBeNull();
    });
  });

  describe("with stored value", () => {
    beforeEach(() => {
      sessionStorage.setItem("age", "18");
    });

    it("works with no options", () => {
      // Initialized with undefined.
      const { result } = renderHook(() => useSessionStorage("age"));
      expect(result.current.value).toEqual(18);

      // Set new value.
      act(() => {
        result.current.set(24);
      });
      expect(result.current.value).toEqual(24);
      expect(sessionStorage.getItem("age")).toEqual("24");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(sessionStorage.getItem("age")).toBeNull();
    });

    it("works with default value", () => {
      // Initialized with undefined.
      const { result } = renderHook(() =>
        useSessionStorage("age", {
          defaultValue: 24,
        })
      );
      expect(result.current.value).toEqual(18);

      // Set new value.
      act(() => {
        result.current.set(24);
      });
      expect(result.current.value).toEqual(24);
      expect(sessionStorage.getItem("age")).toEqual("24");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(sessionStorage.getItem("age")).toBeNull();
    });

    it("works with (de-)serializer", () => {
      // Initialized with undefined.
      const { result } = renderHook(() =>
        useSessionStorage("age", {
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
      expect(sessionStorage.getItem("age")).toEqual("25");

      // Clear value.
      act(() => {
        result.current.remove();
      });
      expect(result.current.value).toEqual(undefined);
      expect(sessionStorage.getItem("age")).toBeNull();
    });
  });
});
