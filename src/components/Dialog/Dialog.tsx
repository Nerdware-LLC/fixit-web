import React from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { SlideTransition } from "../Transitions/SlideTransition";
import { Button } from "../Button";
import { bool, string, func, shape, styleType } from "../../types";

// Docs: https://mui.com/components/dialogs/

export const Dialog = ({
  isVisible,
  title,
  message,
  handleAccept,
  handleCancel,
  acceptLabel = "OK",
  cancelLabel = "CANCEL",
  styles
}: {
  isVisible: boolean;
  title: string;
  message: string;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  acceptLabel?: string;
  cancelLabel?: string;
  styles?: {
    container?: React.ComponentProps<typeof MuiDialog>["style"];
    title?: React.ComponentProps<typeof DialogTitle>["style"];
    message?: React.ComponentProps<typeof DialogContentText>["style"];
  };
}) => (
  <MuiDialog
    open={isVisible}
    onClose={handleCancel}
    aria-labelledby={"dialog-title"}
    aria-describedby={"dialog-message"}
    TransitionComponent={SlideTransition}
    style={styles?.container}
    fullWidth
  >
    <DialogTitle id={"dialog-title"} style={styles?.title}>
      {title}
    </DialogTitle>
    <DialogContent dividers>
      <DialogContentText id={"dialog-message"} style={styles?.message}>
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {handleCancel && <Button label={cancelLabel} onClick={handleCancel} color={"primary"} />}
      <Button label={acceptLabel} onClick={handleAccept} color={"primary"} />
    </DialogActions>
  </MuiDialog>
);

Dialog.propTypes = {
  isVisible: bool.isRequired,
  title: string.isRequired,
  message: string.isRequired,
  handleAccept: func,
  handleCancel: func,
  acceptLabel: string,
  cancelLabel: string,
  styles: shape({
    container: styleType,
    title: styleType,
    message: styleType
  })
};
