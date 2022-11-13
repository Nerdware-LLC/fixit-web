import React from "react";
import { toast } from "react-toastify";
import { useFormikContext } from "formik";
import { Button } from "../Button";
import { styleType } from "../../types";

export const FormSubmitButton = ({ style = {}, ...props }) => {
  const { handleSubmit, isValid, isSubmitting, dirty, errors } = useFormikContext();

  const handlePress = () => {
    if (!dirty) {
      toast("Please fill out all required fields", { type: "error" });
    } else if (!isValid) {
      // prettier-ignore
      toast(`Please review your entries, the input for '${Object.keys(errors)[0]}' is invalid.`, { type: "error" });
    } else if (!isSubmitting) {
      handleSubmit();
    }
  };

  return (
    <Button
      label={"Submit"}
      onClick={handlePress}
      disabled={isSubmitting}
      style={{ ...defaultStyle, ...style }}
      {...props}
    />
  );
};

const defaultStyle = {
  lineHeight: "1.75rem"
};

FormSubmitButton.propTypes = {
  style: styleType
};
