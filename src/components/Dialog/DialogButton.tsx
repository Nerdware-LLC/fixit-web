import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";

export const DialogButton = (buttonProps: React.ComponentProps<typeof StyledDialogButton>) => (
  <StyledDialogButton className="dialog-button" {...buttonProps}></StyledDialogButton>
);

const StyledDialogButton = styled(Button)({
  height: "2.5rem",
  minWidth: "5.5rem",
  padding: "0.75rem",
  paddingBottom: "0.5rem",
  fontSize: "1rem",
  lineHeight: "1rem",
  fontWeight: "bold",
  backgroundColor: "primary.main",

  "@media (max-width: 550px)": {
    fontWeight: 500,
    maxWidth: "40%",
    whiteSpace: "pre-line"
  },

  "@media (max-width: 375px)": {
    height: "3.5rem",
    fontSize: "0.9rem",
    padding: 0,
    paddingTop: "0.25rem"
  }
});
