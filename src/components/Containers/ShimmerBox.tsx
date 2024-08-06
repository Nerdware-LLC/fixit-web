import { styled } from "@mui/material/styles";
import { containerClassNames } from "./classNames.js";

/**
 * A box with a silver shimmer/shine animation effect.
 */
export const ShimmerBox = ({ children, className = "", ...divProps }: ShimmerBoxProps) => (
  <StyledDiv className={containerClassNames.shimmerBoxRoot + " " + className} {...divProps}>
    <div className={containerClassNames.shimmerBoxChildContainer}>{children}</div>
  </StyledDiv>
);

/* This div ensures the animated mask in StyledShimmerBox reveals a
silver background. Without this, the "shimmer" is dark in dark-mode.*/
const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  height: "1.75rem",
  width: "6.5rem",

  backgroundColor: "silver",
  border: `1px solid ${palette.grey[600]}`,
  borderRadius: "0.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [`& > .${containerClassNames.shimmerBoxChildContainer}`]: {
    height: "1.75rem",
    width: "6.5rem",
    backgroundColor: palette.grey[800],
    border: `1px solid ${palette.grey[700]}`,
    borderRadius: "0.35rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    WebkitMask: "linear-gradient(-60deg,#000 30%,#fff5,#000 70%) right/300% 100%",
    animation: "shimmer 2.5s infinite",

    "@keyframes shimmer": {
      "100%": { WebkitMaskPosition: "left" },
    },
  },
}));

export type ShimmerBoxProps = React.ComponentProps<typeof StyledDiv>;
