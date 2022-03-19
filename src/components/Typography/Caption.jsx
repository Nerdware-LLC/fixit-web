import React from "react";
import styled from "styled-components";
import { node } from "../../types";

export const Caption = ({ children }) => (
  <StyledCaption>{children}</StyledCaption>
);

const StyledCaption = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: ${({ theme }) => theme.palette.text.hint};
  line-height: 1rem;
`;

Caption.propTypes = {
  children: node.isRequired
};
