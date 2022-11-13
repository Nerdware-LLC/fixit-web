import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { WebViewPageContainer } from "../WebView";

/**
 * When Fixit is rendered as a webview by the Fixit mobile app, a property called
 * `ReactNativeWebView` is attached to the global `window` object. If that property
 * is present, this component renders `WebViewPageContainer`, which contains relevant
 * styles and logic necessary for sending data back to the mobile application.
 *
 * If that property is not present, the standard page container is rendered.
 */
export const PageContainer = ({
  style = {},
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { palette } = useTheme();

  return Object.prototype.hasOwnProperty.call(window, "ReactNativeWebView") ? (
    <WebViewPageContainer style={style} {...props}>
      {children}
    </WebViewPageContainer>
  ) : (
    <StyledPageContainer
      style={{ backgroundColor: palette.background.default, ...style }}
      {...props}
    >
      {!!children ? children : <Outlet />}
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.div`
  width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  overflow-y: auto;
`;
