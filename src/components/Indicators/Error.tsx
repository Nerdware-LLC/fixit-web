import { IndicatorContainer } from "./IndicatorContainer";
import { Dialog as DialogT, useDialog } from "../Dialog";
import { oneOfType, string, shape, func } from "@types";
import { getTypeSafeErr } from "@utils";

export const Error = ({
  error,
  title = "Whoops!",
  onDismiss,
  ...props
}: Omit<React.ComponentProps<typeof DialogT>, "isVisible" | "title" | "message"> & {
  error: unknown;
  title?: string;
  onDismiss?: Function;
}) => {
  const { Dialog, isDialogVisible, closeDialog } = useDialog(true);

  const errorMsg = getTypeSafeErr(error).message;

  const handleAccept = () => {
    closeDialog();
    if (onDismiss) onDismiss();
  };

  return (
    <>
      {isDialogVisible && (
        <IndicatorContainer>
          <Dialog
            isVisible={isDialogVisible}
            title={title}
            message={errorMsg}
            handleAccept={handleAccept}
            styles={DIALOG_STYLES}
            {...props}
          />
        </IndicatorContainer>
      )}
    </>
  );
};

const DIALOG_STYLES = {
  title: {
    color: "rgba(255, 115, 115, 0.87)",
    fontWeight: "bold"
  }
};

Error.propTypes = {
  title: string,
  error: oneOfType([string, shape({ message: string })]).isRequired,
  onDismiss: func
};
