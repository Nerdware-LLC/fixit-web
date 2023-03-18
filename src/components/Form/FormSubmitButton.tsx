import { toast } from "react-toastify";
import { useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const FormSubmitButton = (props: React.ComponentProps<typeof StyledButton>) => {
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
    <StyledButton
      onClick={handleClick}
      disabled={isSubmitting}
      className="form-submit-button"
      {...props}
    >
      Submit
    </StyledButton>
  );
};

const StyledButton = styled(Button, {
  shouldForwardProp: (propName) => !(propName as string).startsWith("grid")
})<GridProps>({
  lineHeight: "2rem",
  ...muiGridSxProps
});
