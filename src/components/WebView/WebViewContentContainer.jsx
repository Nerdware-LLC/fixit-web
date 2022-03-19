import React from "react";
import styled from "styled-components";
import { any } from "../../types";

export const WebViewContentContainer = ({ children }) => (
  <StyledContentContainer>{children}</StyledContentContainer>
);

const StyledContentContainer = styled.div`
  position: absolute;
  min-height: 80vh;
  width: 85vw;
  padding: 3.5rem 1.75rem 1.75rem 1.75rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

WebViewContentContainer.propTypes = {
  children: any.isRequired
};
