import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { GoogleAuthFormButton } from "@/app/GoogleOAuthContext/GoogleAuthFormButton.jsx";
import { DividerWithText } from "@/components/DataDisplay";
import { Form, FormSubmitButton } from "@/components/Form";
import { UserHandleInput, EmailInput, PasswordInput, PhoneInput } from "@/components/Form/Inputs";
import { ErrorDialog } from "@/components/Indicators";
import { APP_PATHS } from "@/routes/appPaths.js";
import { authService } from "@/services/authService.js";
import { RegisterFormStepper } from "./RegisterFormStepper.jsx";
import {
  registerFormSchema,
  registerFormInitialValues,
  type RegisterFormValues,
} from "./registerFormSchema.js";

const REGISTER_FORM_STEPS: Array<React.ReactNode> = [
  <>
    <UserHandleInput id="handle" />
    <PhoneInput id="phone" />
  </>,
  <>
    <EmailInput id="email" />
    <PasswordInput id="password" autoComplete="new-password" />
    <FormSubmitButton />
    <DividerWithText flexItem>OR</DividerWithText>
    <GoogleAuthFormButton<RegisterFormValues> text="signup_with" />
  </>,
];

export const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const nav = useNavigate();
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const handleSubmit = async ({
    email,
    phone,
    handle,
    password,
    googleIDToken,
  }: RegisterFormValues) => {
    const apiResponse = await fetchWithState(
      async () =>
        await authService.registerNewUser({
          email,
          phone: phone || null, // Don't send empty string (not sure why yup gives '' instead of null)
          handle: `@${handle}`, // <-- "@" prefix added to "handle"
          ...(password
            ? { password } // Send one of `password` or `googleIDToken`
            : { googleIDToken: googleIDToken! }),
        })
    );

    if (apiResponse?.token) {
      toast.success(`Welcome to Fixit — please select a subscription to get started!`, {
        toastId: "select-a-sub",
      });
      nav(APP_PATHS.PRODUCTS);
    }
  };

  return (
    <Form<RegisterFormValues>
      initialValues={registerFormInitialValues}
      validationSchema={registerFormSchema}
      onSubmit={handleSubmit}
      style={{ height: "25rem", justifyContent: "center" }}
    >
      <Box style={{ all: "inherit" }}>{REGISTER_FORM_STEPS[activeStep]}</Box>
      {error && (
        <ErrorDialog
          title={
            /(timeout|network|try again later)/i.test(error.message)
              ? "Network Error"
              : "Invalid Input"
          }
          error={error}
          onDismiss={clearError}
        />
      )}
      <RegisterFormStepper activeStep={activeStep} setActiveStep={setActiveStep} />
    </Form>
  );
};
