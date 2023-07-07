import React, { useRef } from "react";

/**
 * Type guard hook which provides a fallback ref if parent does not forward a ref.
 */
export const useMaybeRef = <T extends HTMLElement>(maybeRef?: React.ForwardedRef<MaybeRef<T>>) => {
  const localRef = useRef<T>(null);
  return maybeRef || localRef;
};

/**
 * Generic typing for a nullable ref.
 */
export type MaybeRef<T extends HTMLElement> = T | null;
