import { useState } from "react";

// TODO: Rename function to useRerender.
/**
 * Force a component to re-render.
 * @returns A function to force re-render.
 */
export function useForceUpdate() {
  const [, setState] = useState({});

  const update = () => setState({});

  return update;
}
