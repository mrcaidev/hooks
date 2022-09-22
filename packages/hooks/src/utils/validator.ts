import type { RefObject } from "react";

export function isBrowser() {
  return typeof window !== "undefined";
}

export function isRef(obj: any): obj is RefObject<any> {
  return typeof obj === "object" && obj !== null && "current" in obj;
}
