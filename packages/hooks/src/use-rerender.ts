import { useState } from "react";

/**
 * Force a component to re-render.
 * @returns A function to force re-render.
 */
export function useRerender() {
  const [, setState] = useState({});

  const rerender = () => setState({});

  return rerender;
}
