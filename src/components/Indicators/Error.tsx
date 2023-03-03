import { styled } from "@mui/material/styles";
import { IndicatorContainer } from "./IndicatorContainer";
import { Dialog } from "@components/Dialog";
import { oneOfType, string, shape, func } from "@/types/propTypes";
import { getTypeSafeErr } from "@utils";

export const Error = ({
  error,
  title = "Whoops!",
  onDismiss,
  ...dialogProps
}: {
  error: unknown;
  title?: string;
  onDismiss?: Function;
} & Omit<React.ComponentProps<typeof Dialog>, "isVisible" | "title" | "message">) => {
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
  "& > .MuiDialogTitle-root": {
    color: theme.palette.error.main,
    fontWeight: "bold"
  }
}));

Error.propTypes = {
  title: string,
  error: oneOfType([string, shape({ message: string })]).isRequired,
  onDismiss: func
};
