import CircularProgress from "@mui/material/CircularProgress";
import { IndicatorContainer } from "./IndicatorContainer";

export const Loading = () => (
  <IndicatorContainer>
    <CircularProgress color={"primary"} size={"7rem"} thickness={4.5} />
  </IndicatorContainer>
);
