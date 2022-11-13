import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { styleType } from "../../types";

export const WebViewPageContainer = ({
  style,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { palette } = useTheme();

  return (
    <StyledWebViewPageContainer
      style={{ backgroundColor: palette.background.default, ...style }}
      {...props}
    >
      {!!children ? children : <Outlet />}
    </StyledWebViewPageContainer>
  );
};

const StyledWebViewPageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;

WebViewPageContainer.propTypes = {
  style: styleType
};
