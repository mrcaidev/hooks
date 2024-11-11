import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useSelection } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <p>Hello</p>
  `;
});

function selectOneLetter() {
  const text = screen.getByText("Hello").firstChild as Text;
  document.getSelection()?.setBaseAndExtent(text, 0, text, 1);
  fireEvent.mouseUp(document);
}

function selectTwoLetters() {
  const text = screen.getByText("Hello").firstChild as Text;
  document.getSelection()?.setBaseAndExtent(text, 0, text, 2);
  fireEvent.mouseUp(document);
}

function cancelSelection() {
  document.getSelection()?.removeAllRanges();
  fireEvent.mouseUp(document);
}

it("responds to selection changes", () => {
  const { result } = renderHook(() => useSelection());
  expect(result.current).toEqual("");

  selectOneLetter();
  expect(result.current).toEqual("H");

  cancelSelection();
  expect(result.current).toEqual("");

  selectTwoLetters();
  expect(result.current).toEqual("He");
});

it("can keep selection after cancelling selection", () => {
  const { result } = renderHook(() => useSelection({ sticky: true }));
  selectOneLetter();
  expect(result.current).toEqual("H");

  cancelSelection();
  expect(result.current).toEqual("H");
});

it("responds to stateful sticky", () => {
  const { result, rerender } = renderHook(
    (sticky) => useSelection({ sticky }),
    { initialProps: false },
  );
  selectOneLetter();
  expect(result.current).toEqual("H");

  cancelSelection();
  expect(result.current).toEqual("");

  rerender(true);
  expect(result.current).toEqual("");

  selectOneLetter();
  expect(result.current).toEqual("H");

  cancelSelection();
  expect(result.current).toEqual("H");
});
