import { object as yupObject, type InferType } from "yup";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { GoogleAuthFormButton } from "@/app/GoogleOAuthContext/GoogleAuthFormButton.jsx";
import { DividerWithText } from "@/components/DataDisplay";
import { Form, FormSubmitButton } from "@/components/Form";
import { EmailInput, PasswordInput } from "@/components/Form/Inputs";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { useAuthLoginNav } from "@/hooks/useAuthLoginNav.js";
import { authService } from "@/services/authService.js";

export const LoginForm = () => {
  const { fetchWithState, error, clearError } = useFetchStateContext();
  const { handleLoginNav } = useAuthLoginNav();

  const onSubmit = async ({ password, googleIDToken, ...values }: LoginFormValues) => {
    await fetchWithState(
      async () =>
        await authService.login({
          ...(password
            ? { password } // Send one of `password` or `googleIDToken`
            : { googleIDToken: googleIDToken! }),
          ...values,
        })
    );
    handleLoginNav();
  };

  return (
    <Form<LoginFormValues>
      initialValues={loginFormInitialValues}
      validationSchema={loginFormSchema}
      onSubmit={onSubmit}
    >
      <EmailInput fieldID="email" />
      <PasswordInput fieldID="password" autoComplete="current-password" />
      <FormSubmitButton />
      <DividerWithText flexItem>OR</DividerWithText>
      <GoogleAuthFormButton text="signin_with" />
      {error && <ErrorDialog error={error} onDismiss={clearError} />}
    </Form>
  );
};

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
export const loginFormSchema = yupObject({
  email: yupCommonSchema.email.required("Required"),
  password: yupCommonSchema.password,
  googleIDToken: yupCommonSchema.googleIDToken,
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
export const loginFormInitialValues = getInitialValuesFromSchema(loginFormSchema);

export type LoginFormValues = InferType<typeof loginFormSchema>;
