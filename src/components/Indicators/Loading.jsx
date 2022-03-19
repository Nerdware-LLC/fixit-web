import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IndicatorContainer } from "./IndicatorContainer";

export const Loading = () => (
  <IndicatorContainer>
    <CircularProgress color={"primary"} size={"7rem"} thickness={4.5} />
  </IndicatorContainer>
);
