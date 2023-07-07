import { styled } from "@mui/material/styles";

/**
 * A box with a silver shimmer/shine animation effect.
 */
export const ShimmerBox = ({ children, ...props }: ShimmerBoxProps) => (
  <StyledDiv className={shimmerBoxClassNames.root} {...props}>
    <div className={shimmerBoxClassNames.childContainer}>{children}</div>
  </StyledDiv>
);

export const shimmerBoxClassNames = {
  root: "shimmer-box-root",
  childContainer: "shimmer-box-child-container",
};

/* This div ensures the animated mask in StyledShimmerBox reveals a
silver background. Without this, the "shimmer" is dark in dark-mode.*/
const StyledDiv = styled("div")(({ theme }) => ({
  height: "1.75rem",
  width: "6.5rem",

  backgroundColor: "silver",
  border: `1px solid ${theme.palette.grey[600]}`,
  borderRadius: "0.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [`& > .${shimmerBoxClassNames.childContainer}`]: {
    height: "1.75rem",
    width: "6.5rem",
    backgroundColor: `${theme.palette.grey[800]}`,
    border: `1px solid ${theme.palette.grey[700]}`,
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
