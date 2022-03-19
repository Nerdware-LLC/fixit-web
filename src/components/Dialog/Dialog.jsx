import React from "react";
import MaterialDialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { SlideTransition } from "../Transitions/SlideTransition";
import { Button } from "../Button";
import { bool, string, func, shape, styleType } from "../../types";

export const Dialog = ({
  isVisible,
  title,
  message,
  handleAccept,
  handleCancel,
  acceptLabel = "OK",
  cancelLabel = "CANCEL",
  styles
}) => (
  <MaterialDialog
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
      {handleCancel && (
        <Button onClick={handleCancel} color={"primary"}>
          {cancelLabel}
        </Button>
      )}
      <Button onClick={handleAccept} color={"primary"}>
        {acceptLabel}
      </Button>
    </DialogActions>
  </MaterialDialog>
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
