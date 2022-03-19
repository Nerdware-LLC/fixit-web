import React from "react";
import { IndicatorContainer } from "./IndicatorContainer";
import { useDialog } from "../Dialog";
import { oneOfType, string, shape, func } from "../../types";

export const Error = ({
  title = "Whoops!",
  error,
  onDismiss,
  ...otherProps
}) => {
  const { Dialog, isDialogVisible, closeDialog } = useDialog(true);

  const errorMsg =
    typeof error === "string"
      ? error
      : error.message
      ? error.message
      : "An error occurred, please try again later.";

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
            styles={styles}
            {...otherProps}
          />
        </IndicatorContainer>
      )}
    </>
  );
};

const styles = {
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
