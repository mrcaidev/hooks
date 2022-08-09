import { act, fireEvent, renderHook, screen } from "@testing-library/react";
import { useModal } from "../src/use-modal";

beforeAll(() => {
  document.body.innerHTML = `
    <button data-testid="open">Open modal</button>
    <div>
      <button data-testid="first">Click</button>
      <button>Click</button>
      <button data-testid="last">Click</button>
    </div>
  `;
});

describe("useModal", () => {
  it("correctly sets up and tears down", () => {
    const openRef = { current: screen.getByTestId("open") };
    const firstRef = { current: screen.getByTestId("first") };
    const lastRef = { current: screen.getByTestId("last") };

    const { result } = renderHook(() => useModal(openRef, firstRef, lastRef));
    expect(result.current.show).toEqual(false);
    expect(result.current.open).toBeInstanceOf(Function);
    expect(result.current.close).toBeInstanceOf(Function);
  });

  it("opens and closes the modal", () => {
    const openRef = { current: screen.getByTestId("open") };
    const firstRef = { current: screen.getByTestId("first") };
    const lastRef = { current: screen.getByTestId("last") };

    const { result } = renderHook(() => useModal(openRef, firstRef, lastRef));
    expect(result.current.show).toEqual(false);

    act(() => result.current.open());
    expect(result.current.show).toEqual(true);
    expect(document.activeElement).toEqual(firstRef.current);

    act(() => result.current.close());
    expect(result.current.show).toEqual(false);
    expect(document.activeElement).toEqual(openRef.current);
  });

  it("can close the modal with the escape key", () => {
    const openRef = { current: screen.getByTestId("open") };
    const firstRef = { current: screen.getByTestId("first") };
    const lastRef = { current: screen.getByTestId("last") };

    const { result } = renderHook(() => useModal(openRef, firstRef, lastRef));
    expect(result.current.show).toEqual(false);

    act(() => result.current.open());
    expect(result.current.show).toEqual(true);
    expect(document.activeElement).toEqual(firstRef.current);

    fireEvent.keyDown(document, { code: "Escape" });
    expect(result.current.show).toEqual(false);
    expect(document.activeElement).toEqual(openRef.current);
  });

  it("traps the focus", () => {
    const openRef = { current: screen.getByTestId("open") };
    const firstRef = { current: screen.getByTestId("first") };
    const lastRef = { current: screen.getByTestId("last") };

    const { result } = renderHook(() => useModal(openRef, firstRef, lastRef));
    act(() => result.current.open());
    expect(document.activeElement).toEqual(firstRef.current);

    fireEvent.keyDown(document, { code: "Tab", shiftKey: true });
    expect(document.activeElement).toEqual(lastRef.current);

    fireEvent.keyDown(document, { code: "Tab" });
    expect(document.activeElement).toEqual(firstRef.current);
  });
});
