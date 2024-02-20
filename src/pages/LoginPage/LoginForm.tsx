import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, type InferType } from "yup";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { Form, FormSubmitButton, TextInput, PasswordInput } from "@/components/Form";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { APP_PATHS } from "@/routes/appPaths";
import { authService } from "@/services/authService";

export const LoginForm = () => {
  const nav = useNavigate();
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const onSubmit = async (credentials: LoginFormValues) => {
    const apiResponse = await fetchWithState(async () => await authService.login(credentials));

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
      sx={{ all: "inherit" }}
    >
      <TextInput id="email" type="email" autoComplete="email" />
      <PasswordInput id="password" autoComplete="current-password" />
      <FormSubmitButton />
      {error && <ErrorDialog error={error} onDismiss={clearError} />}
    </Form>
  );
};

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
const loginFormSchema = yupObject({
  email: yupCommonSchema.email.required("Required"),
  password: yupCommonSchema.password.required("Required"),
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
const loginFormInitialValues = getInitialValuesFromSchema(loginFormSchema);

type LoginFormValues = InferType<typeof loginFormSchema>;
