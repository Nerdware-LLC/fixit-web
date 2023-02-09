import { styled } from "@mui/material/styles";

export const IndicatorContainer = ({ children }: { children: React.ReactNode }) => (
  <StyledIndicatorContainer>{children}</StyledIndicatorContainer>
);

const StyledIndicatorContainer = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  display: flex;
  place-content: center;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000;
`;
