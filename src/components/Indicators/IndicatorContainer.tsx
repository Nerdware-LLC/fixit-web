import { styled } from "@mui/material/styles";

export const IndicatorContainer = ({ children, ...props }: IndicatorContainerProps) => (
  <StyledDiv {...props}>{children}</StyledDiv>
);

const StyledDiv = styled("div")({
  position: "fixed",
  top: "0",
  left: "0",
  height: "calc(100dvh - calc(100dvh - 100%))",
  maxHeight: "100dvh",
  width: "calc(100dvw - calc(100dvw - 100%))",
  maxWidth: "100dvw",
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.35)",
  zIndex: 1000,
});

export type IndicatorContainerProps = React.ComponentProps<typeof StyledDiv>;
