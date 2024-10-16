import { useRef, type ForwardedRef } from "react";

/**
 * Type guard hook which provides a fallback ref if parent does not forward a ref.
 */
export const useMaybeRef = <T extends HTMLElement | SVGElement>(maybeRef?: ForwardedRef<T>) => {
  const localRef = useRef<T>(null);
  return maybeRef ?? localRef;
};
