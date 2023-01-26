import { renderHook } from "@testing-library/react";
import { useTitle } from "src/use-title";

it("responds to stateful title", () => {
  const { rerender } = renderHook((title) => useTitle(title), {
    initialProps: "1",
  });
  expect(document.title).toEqual("1");

  rerender("2");
  expect(document.title).toEqual("2");
});
