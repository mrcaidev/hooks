import { useEffect, useLayoutEffect } from "react";

/**
 * Use layout effect safely in server.
 */
export const useSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
