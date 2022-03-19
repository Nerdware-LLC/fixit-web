import React from "react";
import MaterialButton from "@material-ui/core/Button";
import styled from "styled-components";
import { func, string, element } from "../types";

export const Button = ({ label, children, ...props }) => (
  <StyledButton key={`Button:${label}`} {...props}>
    {label ?? children ?? null}
  </StyledButton>
);

const StyledButton = styled(MaterialButton)`
  box-sizing: border-box;
  font-size: 1rem;
  vertical-align: middle;
  text-decoration: none;
  font-family: Roboto, sans-serif;
  &:hover {
    cursor: pointer;
  }
`;

Button.propTypes = {
  onClick: func,
  label: string,
  children: element
};
