import React from "react";
import { isString } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";
import { backdropClasses } from "@mui/material/Backdrop";
import Button, { buttonClasses } from "@mui/material/Button";
import MuiDialog, { dialogClasses, type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import DialogActions, { dialogActionsClasses } from "@mui/material/DialogActions";
import DialogContent, {
  dialogContentClasses,
  type DialogContentProps,
} from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle, { dialogTitleClasses, type DialogTitleProps } from "@mui/material/DialogTitle";
import { iconButtonClasses } from "@mui/material/IconButton";
import { typographyClasses } from "@mui/material/Typography";
import { CloseIconButton } from "@/components/Buttons/CloseIconButton.jsx";
import { SlideTransition } from "@/components/Transitions/SlideTransition.jsx";
import { dialogElementIDs } from "./elementIDs.js";
import { useDialog } from "./useDialog.js";
import type { Except } from "type-fest";

/**
 * Docs: https://mui.com/components/dialogs/
 */
export const Dialog = <DialogTitle extends React.ReactNode>({
  isVisible = true,
  title,
  dialogTitleProps,
  message,
  children,
  dialogContentProps = {},
  handleAccept,
  handleCancel,
  acceptLabel = "OK",
  cancelLabel = "CANCEL",
  showCancelButton = true,
  ...dialogProps
}: DialogProps<DialogTitle>) => (
  <StyledMuiDialog
    open={isVisible}
    onClose={handleCancel}
    aria-labelledby={dialogElementIDs.title}
    aria-describedby={dialogElementIDs.message}
    TransitionComponent={SlideTransition}
    fullWidth
    {...dialogProps}
  >
    {isString(title) ? (
      <DialogTitle id={dialogElementIDs.title} color="secondary" {...(dialogTitleProps ?? {})}>
        {title}
        {handleCancel && <CloseIconButton onClick={handleCancel} aria-label="close dialog" />}
      </DialogTitle>
    ) : (
      title
    )}
    <DialogContent id={dialogElementIDs.message} dividers {...dialogContentProps}>
      {isString(message) ? (
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
        right: "0.5rem",
        top: "50%",
        transform: "translateY(-50%)",
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

export type DialogProps<DialogTitle extends React.ReactNode = React.ReactNode> = Except<
  MuiDialogProps,
  "title" | "open"
> & {
  /** Whether or not the Dialog is visible (default: `true`) */
  isVisible?: boolean;
  title: DialogTitle;
  /** Props for the DialogTitle component (ignored if `title` is not a string). */
  dialogTitleProps?: DialogTitle extends string
    ? Except<DialogTitleProps, "id" | "children">
    : never;
  message?: React.ReactNode;
  children?: React.ReactNode;
  /** Props for the DialogContent component. */
  dialogContentProps?: Except<DialogContentProps, "id" | "children">;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel?: React.MouseEventHandler<HTMLButtonElement>;
  acceptLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  showCancelButton?: boolean;
};
