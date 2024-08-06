import { useFormikContext } from "formik";
import { BaseFormSubmitButton, type BaseFormSubmitButtonProps } from "./BaseFormSubmitButton.jsx";
import { formClassNames } from "./classNames.js";
import type { Simplify } from "type-fest";

/**
 * Formik-integrated submit button (uses {@link BaseFormSubmitButton}).
 */
export const FormSubmitButton = ({ className = "", ...props }: FormSubmitButtonProps) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <BaseFormSubmitButton
      label="Submit"
      isLoading={isSubmitting}
      onClick={handleClick}
      disabled={isSubmitting}
      className={formClassNames.submitButton + " " + className}
      {...props}
    />
  );
};

export type FormSubmitButtonProps = Simplify<
  Omit<BaseFormSubmitButtonProps, "label" | "isLoading" | "onClick" | "disabled">
>;
