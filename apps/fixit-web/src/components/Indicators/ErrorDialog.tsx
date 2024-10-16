import { getErrorMessage } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";
import { dialogTitleClasses } from "@mui/material/DialogTitle";
import { Dialog, type DialogProps } from "@/components/Dialog";

export const ErrorDialog = ({
  error,
  title = "Whoops!",
  onDismiss,
  ...dialogProps
}: ErrorDialogProps) => {
  const { isDialogVisible, closeDialog } = Dialog.use(true);

  const errorMsg = getErrorMessage(error);

  const handleAccept = () => {
    closeDialog();
    if (onDismiss) onDismiss();
  };

  return (
    <>
      {isDialogVisible && (
        <StyledDialog
          isVisible={isDialogVisible}
          title={title}
          message={errorMsg}
          handleAccept={handleAccept}
          {...dialogProps}
        />
      )}
    </>
  );
};

const StyledDialog = styled(Dialog)(({ theme: { palette } }) => ({
  [`& .${dialogTitleClasses.root}`]: {
    color: palette.error.main,
    fontWeight: "bold",
  },
}));

export type ErrorDialogProps = {
  error: unknown;
  title?: string;
  onDismiss?: () => unknown;
} & Omit<DialogProps, "isVisible" | "title" | "message">;
