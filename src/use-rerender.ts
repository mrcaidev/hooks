import { useState } from "react";

/**
 * Force the component to re-render.
 */
export function useRerender() {
  const [, setState] = useState({});

  const rerender = () => setState({});

  return rerender;
}
