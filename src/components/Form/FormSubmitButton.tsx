import { useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps as MuiGrisSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import Button, { type ButtonProps } from "@mui/material/Button";
import { formClassNames } from "./classNames";

export const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <StyledButton
      onClick={handleClick}
      disabled={isSubmitting}
      className={formClassNames.submitButton}
      {...props}
    >
      Submit
    </StyledButton>
  );
};

const StyledButton = styled(Button, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGrisSxProps>({
  lineHeight: "2rem",
  ...muiGridSxProps,
});

export type FormSubmitButtonProps = Omit<ButtonProps & MuiGrisSxProps, "onClick" | "disabled">;
