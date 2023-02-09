import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useFormikContext } from "formik";

export const FormSubmitButton = ({ style = {}, ...props }: React.ComponentProps<typeof Button>) => {
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
      onClick={handleClick}
      disabled={isSubmitting}
      style={{ lineHeight: "2rem", ...style }}
      {...props}
    >
      Submit
    </Button>
  );
};
