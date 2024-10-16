import { useState, useEffect } from "react";
import { globalAnimations } from "@/app/GlobalStyles/animations.js";

const { wiggleX } = globalAnimations;

/**
 * A hook for applying a wiggle animation to a component.
 *
 * > This hook uses the {@link globalAnimations.wiggleX|wiggleX} global animation className.
 */
export const useWiggleAnimation = (durationMS: number = wiggleX.durationMS) => {
  const [shouldWiggle, setShouldWiggle] = useState(false);

  useEffect(() => {
    if (shouldWiggle) {
      const timeoutID = setTimeout(() => setShouldWiggle(false), durationMS);
      return () => clearTimeout(timeoutID);
    }
  }, [shouldWiggle, setShouldWiggle, durationMS]);

  return {
    /**
     * If `shouldWiggle` is `true`, this is set to the {@link wiggleX.className|wiggleX}
     * global animation className — otherwise, it is `undefined`.
     */
    wiggleClassName: shouldWiggle ? wiggleX.className : undefined,
    shouldWiggle,
    setShouldWiggle,
  };
};
