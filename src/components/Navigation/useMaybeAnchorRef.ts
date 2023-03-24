import { useRef, type ForwardedRef } from "react";
import type { MaybeAnchorRef } from "./types";

/**
 * Type guard hook which provides a fallback anchor ref if parent does not forward a ref.
 */
export const useMaybeAnchorRef = (maybeAnchorRef?: ForwardedRef<MaybeAnchorRef>) => {
  const localRef = useRef<HTMLAnchorElement>(null);
  return maybeAnchorRef || localRef;
};
