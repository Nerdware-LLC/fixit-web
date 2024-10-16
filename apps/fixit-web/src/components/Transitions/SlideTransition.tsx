import { forwardRef } from "react";
import Slide, { type SlideProps } from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";

/**
 * Docs: https://mui.com/components/transitions/
 */
export const SlideTransition = forwardRef<React.Ref<unknown>, SlideTransitionProps>(
  function SlideTransition({ direction = "up", ...props }, ref) {
    return <Slide direction={direction} ref={ref} {...props} />;
  }
);

export type SlideTransitionProps = SlideProps & TransitionProps;
