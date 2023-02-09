import { styled } from "@mui/material/styles";

/**
 * A box with a silver shimmer/shine animation effect.
 */
export const ShimmerBox = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">) => (
  <StyledShimmerBox className="shimmer-box shimmer-box-bg" {...props}>
    <div className="shimmer-box shimmer-box-child">{children}</div>
  </StyledShimmerBox>
);

/* This div ensures the animated mask in StyledShimmerBox reveals a
silver background. Without this, the "shimmer" is dark in dark-mode.*/
const StyledShimmerBox = styled("div")(({ theme }) => ({
  height: "1.75rem",
  width: "6.5rem",

  backgroundColor: "silver",
  border: `1px solid ${theme.palette.grey[600]}`,
  borderRadius: "0.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& > div.shimmer-box-child": {
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
      "100%": { WebkitMaskPosition: "left" }
    }
  }
}));
