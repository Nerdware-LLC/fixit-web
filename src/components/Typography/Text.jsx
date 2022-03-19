import React from "react";
import styled from "styled-components";
import { node } from "../../types";

export const Text = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
);

const StyledText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${props => props.theme.palette.text.primary};
  line-height: 1rem;
`;

Text.propTypes = {
  children: node.isRequired
};
