import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, type InferType } from "yup";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { GoogleAuthFormButton } from "@/app/GoogleOAuthContext/GoogleAuthFormButton.jsx";
import { DividerWithText } from "@/components/DataDisplay";
import { Form, FormSubmitButton } from "@/components/Form";
import { EmailInput, PasswordInput } from "@/components/Form/Inputs";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { APP_PATHS } from "@/routes/appPaths.js";
import { authService } from "@/services/authService.js";

export const LoginForm = () => {
  const nav = useNavigate();
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const onSubmit = async ({ password, googleIDToken, ...values }: LoginFormValues) => {
    const apiResponse = await fetchWithState(
      async () =>
        await authService.login({
          ...(password
            ? { password } // Send one of `password` or `googleIDToken`
            : { googleIDToken: googleIDToken! }),
          ...values,
        })
    );

    if (apiResponse?.token) {
      toast.success("Welcome back!", { toastId: "login-success" });
      nav(APP_PATHS.HOME);
    }
  };

  return (
    <Form<LoginFormValues>
      initialValues={loginFormInitialValues}
      validationSchema={loginFormSchema}
      onSubmit={onSubmit}
    >
      <EmailInput id="email" />
      <PasswordInput id="password" autoComplete="current-password" />
      <FormSubmitButton />

      {error && <ErrorDialog error={error} onDismiss={clearError} />}

      <DividerWithText flexItem>OR</DividerWithText>

      <GoogleAuthFormButton text="signin_with" requiredFieldInputs={<EmailInput id="email" />} />
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
