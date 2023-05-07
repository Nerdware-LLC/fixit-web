import { styled } from "@mui/material/styles";
import { backdropClasses } from "@mui/material/Backdrop";
import Button, { buttonClasses } from "@mui/material/Button";
import MuiDialog, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import DialogActions, { dialogActionsClasses } from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SlideTransition } from "@components/Transitions/SlideTransition";
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
}: DialogProps) => (
  <StyledMuiDialog
    open={isVisible}
    onClose={handleCancel}
    aria-labelledby={dialogElementIDs.title}
    aria-describedby={dialogElementIDs.message}
    TransitionComponent={SlideTransition}
    fullWidth
    {...containerProps}
  >
    <DialogTitle id={dialogElementIDs.title} color="secondary">
      {title}
    </DialogTitle>
    <DialogContent id={dialogElementIDs.message} dividers>
      {typeof message === "string" ? (
        <DialogContentText color="action">{message}</DialogContentText>
      ) : (
        message ?? children
      )}
    </DialogContent>
    <DialogActions>
      {handleCancel && (
        <Button onClick={handleCancel} variant="outlined">
          {cancelLabel}
        </Button>
      )}
      <Button onClick={handleAccept}>{acceptLabel}</Button>
    </DialogActions>
  </StyledMuiDialog>
);

Dialog.use = useDialog;

export const dialogElementIDs = {
  title: "dialog-title",
  message: "dialog-message",
};

const StyledMuiDialog = styled(MuiDialog)(({ theme }) => ({
  [`& > .${backdropClasses.root}`]: {
    backdropFilter: "blur( 5px )",
  },

  [`& .${dialogActionsClasses.root}`]: {
    padding: "1rem",
    gap: "1rem",
    justifyContent: theme.variables.isMobilePageLayout ? "space-evenly" : "flex-end",

    [`& > .${buttonClasses.root}`]: {
      height: "2.5rem",
      minWidth: "5.5rem",
      margin: "0 !important",
      padding: "0.75rem",
      paddingBottom: "0.5rem",
      fontSize: "1rem",
      lineHeight: "1rem",
      fontWeight: "bold !important",

      "@media (max-width: 550px)": {
        maxWidth: "40%",
        fontWeight: 500,
        whiteSpace: "pre-line",
      },

      "@media (max-width: 375px)": {
        height: "3.5rem",
        padding: 0,
        paddingTop: "0.25rem",
        fontSize: "0.9rem",
      },
    },
  },
}));

export type DialogProps = {
  isVisible: boolean;
  title: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  acceptLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
} & Omit<MuiDialogProps, "open">;
