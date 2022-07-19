import { useState } from "react";

/**
 * Use a function to force component update.
 *
 * @returns A function to force component update.
 *
 * @public
 */
export function useForceUpdate(): () => void {
  const [, setState] = useState({});
  const update = () => setState({});
  return update;
}