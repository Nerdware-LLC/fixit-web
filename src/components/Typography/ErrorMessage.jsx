import React from "react";
import styled from "styled-components";
import { Text } from "./Text";
import { node, string } from "../../types";

export const ErrorMessage = ({ error, children, ...props }) => (
  <StyledErrorBox error={error} {...props}>
    <StyledErrorText>{children ?? error ?? ""}</StyledErrorText>
  </StyledErrorBox>
);

const StyledErrorBox = styled.div`
  box-sizing: border-box;
  visibility: ${({ error }) => (error ? "visible" : "hidden")};
  height: 1.5rem;
  padding: 0.25rem 0;
  white-space: nowrap;
`;

const StyledErrorText = styled(Text)`
  color: ${({ theme }) => theme.palette.error.main};
  position: relative;
  animation-duration: 1s;
  animation-name: slide-down;
  @keyframes slide-down {
    from {
      top: -1rem;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

ErrorMessage.propTypes = {
  error: string,
  children: node
};
