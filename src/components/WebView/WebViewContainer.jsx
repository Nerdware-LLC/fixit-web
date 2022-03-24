import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { WebViewContext } from "./WebViewContext";
import { ENV } from "../../config";
import { styleType } from "../../types";
import { logger } from "../../utils";

export const WebViewContainer = ({ style, ...otherProps }) => {
  const navigate = useNavigate();
  const locationObj = useLocation();

  // window.ReactNativeWebView.postMessage only accepts one argument which must be a string.
  const webViewPostMessage = input => {
    const message = typeof input === "string" ? input : JSON.stringify(input);

    if (Object.prototype.hasOwnProperty.call(window, "ReactNativeWebView")) {
      window.ReactNativeWebView.postMessage(message);
    } else if (!ENV.IS_PROD_ENV) {
      // If not mobile and not prod, log the message then go back to DevNavMenu.
      logger.info(message);
      navigate("/");
    } else {
      // If not mobile in prod, log error.
      logger.error(
        `Method "window.ReactNativeWebView.postMessage" is not available.
        INTENDED MESSAGE: ${message}
        CONTEXT: ${JSON.stringify(locationObj)}`
      );
    }
  };

  return (
    <WebViewContext.Provider value={{ webViewPostMessage }}>
      <StyledWebViewPageContainer style={style} {...otherProps}>
        <Outlet />
      </StyledWebViewPageContainer>
    </WebViewContext.Provider>
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
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;

WebViewContainer.propTypes = {
  style: styleType
};
