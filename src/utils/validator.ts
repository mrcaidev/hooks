import { type MutableRefObject } from "react";

export function isBrowser() {
  return typeof window !== "undefined";
}

export function isRef(obj: any): obj is MutableRefObject<any> {
  return "current" in obj;
}
