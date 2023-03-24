import { styled } from "@mui/material/styles";
import MuiDialog, { type DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { SlideTransition } from "@components/Transitions/SlideTransition";
import { DialogButton } from "./DialogButton";
import { useDialog } from "./useDialog";

/**
 * Docs: https://mui.com/components/dialogs/
 */
export const Dialog = ({
  isVisible,
  title,
  message,
  children,
  handleAccept,
  handleCancel,
  acceptLabel = "OK",
  cancelLabel = "CANCEL",
  ...containerProps
}: {
  isVisible: boolean;
  title: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  acceptLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
} & Omit<DialogProps, "open">) => (
  <StyledDialog
    open={isVisible}
    onClose={handleCancel}
    aria-labelledby="dialog-title"
    aria-describedby="dialog-message"
    TransitionComponent={SlideTransition}
    fullWidth
    {...containerProps}
  >
    <DialogTitle id="dialog-title" color="secondary">
      {title}
    </DialogTitle>
    <DialogContent id="dialog-message" dividers>
      {typeof message === "string" ? (
        <DialogContentText color="action">{message}</DialogContentText>
      ) : (
        message ?? children
      )}
    </DialogContent>
    <DialogActions>
      {handleCancel && (
        <DialogButton onClick={handleCancel} variant="outlined">
          {cancelLabel}
        </DialogButton>
      )}
      <DialogButton onClick={handleAccept}>{acceptLabel}</DialogButton>
    </DialogActions>
  </StyledDialog>
);

Dialog.use = useDialog;

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& > .MuiBackdrop-root": {
    backdropFilter: "blur( 5px )"
  },

  "& .MuiDialogActions-root": {
    padding: "1rem",
    gap: "1rem",
    justifyContent: theme.variables.isMobilePageLayout ? "space-evenly" : "flex-end",

    "& > button": {
      margin: "0 !important"
    }
  }
}));
