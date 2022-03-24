import React from "react";
import Slide from "@mui/material/Slide";

// Docs: https://mui.com/components/transitions/

export const SlideTransition = React.forwardRef((props, ref) => (
  <Slide direction={"up"} ref={ref} {...props} />
));

SlideTransition.displayName = "SlideTransition";
