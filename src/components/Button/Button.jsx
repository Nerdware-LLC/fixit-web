import React from "react";
import MuiButton from "@mui/material/Button";
import styled from "@emotion/styled";
import { func, string, element } from "../../types";

// Docs: https://mui.com/components/buttons/

export const Button = ({ label, children, ...props }) => (
  <StyledButton key={`Button:${label}`} {...props}>
    {label ?? children ?? null}
  </StyledButton>
);

const StyledButton = styled(MuiButton)`
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
