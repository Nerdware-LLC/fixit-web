import { toast } from "react-toastify";
import { object as yupObject, type InferType } from "yup";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { Form, FormSubmitButton } from "@/components/Form";
import { EmailInput } from "@/components/Form/Inputs";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { authService } from "@/services/authService.js";

export const ForgotPasswordForm = () => {
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    await fetchWithState(async () => await authService.passwordResetInit({ email }));

    toast.info(
      "Your request has been submitted. If an account exists for the provided email, you will receive a password reset email shortly.",
      { toastId: "pw-reset-request-submitted" }
    );
  };

  return (
    <Form<ForgotPasswordFormValues>
      initialValues={forgotPasswordFormInitialValues}
      validationSchema={forgotPasswordFormSchema}
      onSubmit={onSubmit}
    >
      <EmailInput fieldID="email" />
      <FormSubmitButton />
      {error && <ErrorDialog error={error} onDismiss={clearError} />}
    </Form>
  );
};

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
export const forgotPasswordFormSchema = yupObject({
  email: yupCommonSchema.email.required("Required"),
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
export const forgotPasswordFormInitialValues = getInitialValuesFromSchema(forgotPasswordFormSchema);

export type ForgotPasswordFormValues = InferType<typeof forgotPasswordFormSchema>;
