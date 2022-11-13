import React from "react";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";

// Docs: https://mui.com/components/transitions/

export const SlideTransition = React.forwardRef(function SlideTransition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
