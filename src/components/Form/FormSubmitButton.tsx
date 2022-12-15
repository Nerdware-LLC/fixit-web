import { toast } from "react-toastify";
import { useFormikContext } from "formik";
import { Button } from "../Button";

export const FormSubmitButton = ({
  style = {},
  ...props
}: Omit<React.ComponentProps<typeof Button>, "label">) => {
  const { handleSubmit, isValid, isSubmitting, dirty, errors } = useFormikContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!dirty)
      toast.error("Please fill out all required fields", { toastId: "required-fields-error" });
    else if (!isValid)
      toast.error(
        `Please review your entries, the input for "${Object.keys(errors)[0]}" is invalid.`,
        { toastId: "invalid-input-error" }
      );
    else if (!isSubmitting) handleSubmit();
  };

  return (
    <Button
      label="Submit"
      onClick={handleClick}
      disabled={isSubmitting}
      style={{ lineHeight: "1.75rem", ...style }}
      {...props}
    />
  );
};
