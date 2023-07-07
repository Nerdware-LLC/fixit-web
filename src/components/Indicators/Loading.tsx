import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";
import { IndicatorContainer, type IndicatorContainerProps } from "./IndicatorContainer";

export const Loading = ({
  color = "primary",
  size = "7rem",
  thickness = 4.5,
  IndicatorContainerProps = {},
  ...circularProgressProps
}: LoadingProps) => (
  <IndicatorContainer {...IndicatorContainerProps}>
    <CircularProgress color={color} size={size} thickness={thickness} {...circularProgressProps} />
  </IndicatorContainer>
);

export type LoadingProps = CircularProgressProps & {
  IndicatorContainerProps?: IndicatorContainerProps;
};
