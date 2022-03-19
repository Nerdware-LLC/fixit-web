import React, { memo } from "react";
import styled from "styled-components";
import { ErrorBoundary } from "../ErrorBoundary";
import { styleType, any } from "../../types";

export const WebViewPageContainer = memo(
  ({ style, children, ...otherProps }) => (
    <ErrorBoundary>
      <StyledWebViewPageContainer style={style} {...otherProps}>
        {children}
      </StyledWebViewPageContainer>
    </ErrorBoundary>
  )
);

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

WebViewPageContainer.displayName = "WebViewPageContainer";

WebViewPageContainer.propTypes = {
  style: styleType,
  children: any.isRequired
};
