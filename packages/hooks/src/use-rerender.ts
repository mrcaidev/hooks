import { useState } from "react";

/**
 * Force a component to re-render.
 */
export function useRerender() {
  const [, setState] = useState({});
  const rerender = () => setState({});

  return rerender;
}
