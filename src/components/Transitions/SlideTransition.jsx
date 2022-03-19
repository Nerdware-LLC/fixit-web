import React from "react";
import Slide from "@material-ui/core/Slide";

export const SlideTransition = React.forwardRef((props, ref) => (
  <Slide direction={"up"} ref={ref} {...props} />
));

SlideTransition.displayName = "SlideTransition";
