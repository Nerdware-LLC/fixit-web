import React from "react";
import styled from "styled-components";
import { node } from "../../types";

export const Title = ({ children, ...props }) => (
  <StyledTitle {...props}>{children}</StyledTitle>
);

const StyledTitle = styled.p`
  font-size: 1.25rem;
  margin: 0;
  color: ${props => props.theme.palette.text.primary};
  line-height: 1.25rem;
`;

Title.propTypes = {
  children: node.isRequired
};
