import { styled } from "@mui/material/styles";

export const IndicatorContainer = ({ children }: { children: React.ReactNode }) => (
  <StyledIndicatorContainer>{children}</StyledIndicatorContainer>
);

const StyledIndicatorContainer = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  height: calc(100dvh - calc(100dvh - 100%));
  max-height: 100dvh;
  width: calc(100dvw - calc(100dvw - 100%));
  max-width: 100dvw;
  display: flex;
  place-content: center;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000;
`;
