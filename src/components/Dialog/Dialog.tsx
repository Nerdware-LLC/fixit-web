import { styled } from "@mui/material/styles";
import { backdropClasses } from "@mui/material/Backdrop";
import Button, { buttonClasses } from "@mui/material/Button";
import MuiDialog, { dialogClasses, type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import DialogActions, { dialogActionsClasses } from "@mui/material/DialogActions";
import DialogContent, { dialogContentClasses } from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle, { dialogTitleClasses } from "@mui/material/DialogTitle";
import IconButton, { iconButtonClasses } from "@mui/material/IconButton";
import { typographyClasses } from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { SlideTransition } from "@/components/Transitions/SlideTransition";
import { dialogElementIDs } from "./elementIDs";
import { useDialog } from "./useDialog";

/**
 * Docs: https://mui.com/components/dialogs/
 */
export const Dialog = ({
  isVisible = true,
  title,
  message,
  children,
  handleAccept,
  handleCancel,
  acceptLabel = "OK",
  cancelLabel = "CANCEL",
  showCancelButton = true,
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
    {typeof title === "string" ? (
      <DialogTitle id={dialogElementIDs.title} color="secondary">
        {title}
        {handleCancel && (
          <IconButton onClick={handleCancel} aria-label="close dialog">
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
    ) : (
      title
    )}
    <DialogContent id={dialogElementIDs.message} dividers>
      {typeof message === "string" ? (
        <DialogContentText color="action">{message}</DialogContentText>
      ) : (
        message ?? children
      )}
    </DialogContent>
    <DialogActions disableSpacing>
      {handleCancel && showCancelButton && (
        <Button onClick={handleCancel} variant="outlined">
          {cancelLabel}
        </Button>
      )}
      <Button onClick={handleAccept}>{acceptLabel}</Button>
    </DialogActions>
  </StyledMuiDialog>
);

Dialog.use = useDialog;

const StyledMuiDialog = styled(MuiDialog)(({ theme: { variables, breakpoints } }) => ({
  [`& > .${backdropClasses.root}`]: {
    backdropFilter: "blur( 5px )",
  },

  [`& .${dialogClasses.paper}`]: {
    minWidth: "20rem",

    [`& > .${dialogTitleClasses.root}`]: {
      position: "relative",

      [`& .${iconButtonClasses.root}`]: {
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        color: "rgb(150,150,150)",
      },
    },

    [`& > .${dialogContentClasses.root}`]: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",

      [`& .${typographyClasses.root}`]: {
        lineHeight: "1.35rem",
      },
    },

    [`& > .${dialogActionsClasses.root}`]: {
      padding: "1rem",
      gap: "1rem",
      justifyContent: variables.isMobilePageLayout ? "space-evenly" : "flex-end",

      [`& > .${buttonClasses.root}`]: {
        position: "relative",
        height: "2.5rem",
        minWidth: "5.5rem",
        fontSize: "1rem",
        lineHeight: "1rem",
        fontWeight: "bold !important",

        [breakpoints.down(550)]: {
          // 550px wide and under:
          maxWidth: "40%",
          fontSize: "0.9rem",
          whiteSpace: "pre-line",
        },
      },
    },
  },
}));

export type DialogProps = Omit<MuiDialogProps, "title" | "open"> & {
  /** Whether or not the Dialog is visible (default: `true`) */
  isVisible?: boolean;
  title: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  acceptLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  showCancelButton?: boolean;
};
