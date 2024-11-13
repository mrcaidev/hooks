import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useTextSelection } from "src";

beforeAll(() => {
  document.body.innerHTML = `
    <div data-testid="target">hello</div>
  `;
});

function selectOneLetter() {
  const text = screen.getByTestId("target").firstChild as Text;
  document.getSelection()?.setBaseAndExtent(text, 0, text, 1);
  fireEvent.mouseUp(document);
}

function selectTwoLetters() {
  const text = screen.getByTestId("target").firstChild as Text;
  document.getSelection()?.setBaseAndExtent(text, 0, text, 2);
  fireEvent.mouseUp(document);
}

function cancelSelection() {
  document.getSelection()?.removeAllRanges();
  fireEvent.mouseUp(document);
}

it("returns selected text", () => {
  selectOneLetter();

  const { result } = renderHook(() => useTextSelection());

  expect(result.current).toEqual("h");
});

it("listens to selection changes", () => {
  const { result } = renderHook(() => useTextSelection());

  expect(result.current).toEqual("");

  selectOneLetter();

  expect(result.current).toEqual("h");

  cancelSelection();

  expect(result.current).toEqual("");

  selectTwoLetters();

  expect(result.current).toEqual("he");

  cancelSelection();

  expect(result.current).toEqual("");
});

it("can keep selection after cancellation", () => {
  const { result } = renderHook(() => useTextSelection({ sticky: true }));

  expect(result.current).toEqual("");

  selectOneLetter();

  expect(result.current).toEqual("h");

  cancelSelection();

  expect(result.current).toEqual("h");

  selectTwoLetters();

  expect(result.current).toEqual("he");

  cancelSelection();

  expect(result.current).toEqual("he");
});

it("responds to dynamic `sticky`", () => {
  const { result, rerender } = renderHook(
    (sticky) => useTextSelection({ sticky }),
    { initialProps: false },
  );

  expect(result.current).toEqual("");

  selectOneLetter();

  expect(result.current).toEqual("h");

  cancelSelection();

  expect(result.current).toEqual("");

  rerender(true);

  expect(result.current).toEqual("");

  selectOneLetter();

  expect(result.current).toEqual("h");

  cancelSelection();

  expect(result.current).toEqual("h");
});
