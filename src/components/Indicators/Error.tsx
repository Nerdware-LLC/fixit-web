import { styled } from "@mui/material/styles";
import { dialogTitleClasses } from "@mui/material/DialogTitle";
import { Dialog, type DialogProps } from "@components/Dialog";
import { getTypeSafeErr } from "@utils/typeSafety";
import { IndicatorContainer } from "./IndicatorContainer";

export const Error = ({ error, title = "Whoops!", onDismiss, ...dialogProps }: ErrorProps) => {
  const { isDialogVisible, closeDialog } = Dialog.use(true);

  const errorMsg = getTypeSafeErr(error).message;

  const handleAccept = () => {
    closeDialog();
    if (onDismiss) onDismiss();
  };

  return (
    <>
      {isDialogVisible && (
        <IndicatorContainer>
          <StyledDialog
            isVisible={isDialogVisible}
            title={title}
            message={errorMsg}
            handleAccept={handleAccept}
            {...dialogProps}
          />
        </IndicatorContainer>
      )}
    </>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& > .${dialogTitleClasses.root}`]: {
    color: theme.palette.error.main,
    fontWeight: "bold",
  },
}));

export type ErrorProps = {
  error: unknown;
  title?: string;
  onDismiss?: () => any;
} & Omit<DialogProps, "isVisible" | "title" | "message">;
