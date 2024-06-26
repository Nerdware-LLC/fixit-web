import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, string as yupString, ref as yupRef, type InferType } from "yup";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { Form, FormSubmitButton } from "@/components/Form";
import { PasswordInput } from "@/components/Form/Inputs";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { APP_PATHS } from "@/routes/appPaths.js";
import { authService } from "@/services/authService.js";

export const ResetPasswordForm = () => {
  const nav = useNavigate();
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const [searchParams] = useSearchParams();
  const pwResetToken = searchParams.get("token");

  const onSubmit = async ({ password }: ResetPasswordFormValues) => {
    await fetchWithState(
      async () => await authService.passwordReset({ password, passwordResetToken: pwResetToken! })
    );

    toast.success("Your password has been reset — please login with your new password.", {
      toastId: "pw-reset-success",
    });

    nav(APP_PATHS.LOGIN);
  };

  return (
    <Form<ResetPasswordFormValues>
      initialValues={resetPasswordFormInitialValues}
      validationSchema={resetPasswordFormSchema}
      onSubmit={onSubmit}
    >
      <PasswordInput id="password" disabled={!pwResetToken} />
      <PasswordInput
        id="repeatPassword"
        disabled={!pwResetToken}
        placeholder="Please re-enter your password"
      />
      <FormSubmitButton />
      {error && <ErrorDialog error={error} onDismiss={clearError} />}
    </Form>
  );
};

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
export const resetPasswordFormSchema = yupObject({
  password: yupCommonSchema.password.required(),
  repeatPassword: yupString().equals([yupRef("password")], "Must match the above password value"),
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
export const resetPasswordFormInitialValues = getInitialValuesFromSchema(resetPasswordFormSchema);

export type ResetPasswordFormValues = InferType<typeof resetPasswordFormSchema>;
