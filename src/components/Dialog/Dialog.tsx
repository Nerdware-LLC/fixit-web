import MuiDialog from "@mui/material/Dialog";
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
  handleAccept,
  handleCancel,
  acceptLabel = "OK",
  cancelLabel = "CANCEL",
  ...containerProps
}: {
  isVisible: boolean;
  title: React.ReactNode;
  message: React.ReactNode;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  acceptLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
} & Omit<React.ComponentProps<typeof MuiDialog>, "open">) => (
  <MuiDialog
    open={isVisible}
    onClose={handleCancel}
    aria-labelledby="dialog-title"
    aria-describedby="dialog-message"
    TransitionComponent={SlideTransition}
    fullWidth
    {...containerProps}
  >
    <DialogTitle color="secondary">{title}</DialogTitle>
    <DialogContent dividers>
      {typeof message === "string" ? (
        <DialogContentText color="action" style={{ whiteSpace: "pre-line" }}>
          {message}
        </DialogContentText>
      ) : (
        message
      )}
    </DialogContent>
    <DialogActions
      style={{
        padding: "1rem 0.5rem",
        justifyContent: "space-evenly"
      }}
    >
      {handleCancel && (
        <DialogButton onClick={handleCancel} variant="outlined">
          {cancelLabel}
        </DialogButton>
      )}
      <DialogButton onClick={handleAccept}>{acceptLabel}</DialogButton>
    </DialogActions>
  </MuiDialog>
);

Dialog.use = useDialog;
