import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, type InferType } from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { Form, FormSubmitButton, TextInput, PasswordInput, PhoneInput } from "@/components/Form";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { APP_PATHS } from "@/routes/appPaths";
import { authService } from "@/services/authService";

export const RegisterForm = () => {
  const nav = useNavigate();
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const handleSubmit = async (values: RegisterFormValues) => {
    const apiResponse = await fetchWithState(
      async () =>
        await authService.registerNewUser({
          ...values,
          handle: `@${values.handle}`, // <-- "@" prefix added to "handle"
        })
    );

    if (apiResponse?.token) {
      toast.success(`Welcome to Fixit - please select a subscription to get started!`, {
        toastId: "select-a-sub",
      });
      nav(APP_PATHS.PRODUCTS);
    }
  };

  // TODO Show user password requirements

  return (
    <Form<RegisterFormValues>
      initialValues={registerFormInitialValues}
      validationSchema={registerFormSchema}
      onSubmit={handleSubmit}
      sx={{ all: "inherit" }}
    >
      <TextInput
        id="handle"
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
      <PhoneInput id="phone" />
      <TextInput id="email" type="email" autoComplete="email" />
      <PasswordInput id="password" autoComplete="new-password" />
      <FormSubmitButton />
      {error && <ErrorDialog title="Invalid Input" error={error} onDismiss={clearError} />}
    </Form>
  );
};

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
const registerFormSchema = yupObject({
  handle: yupCommonSchema.string
    .lowercase()
    .matches(
      /^[a-z0-9_]{3,50}$/,
      "Must be between 3-50 characters, and only contain letters, numbers, and underscores"
    )
    .required("Please choose a handle (this is how other users will identify you)"),
  phone: yupCommonSchema.phone.required("Please provide a phone number"),
  email: yupCommonSchema.email.required("Please provide an email"),
  password: yupCommonSchema.password.required("Please enter a password"),
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
const registerFormInitialValues = getInitialValuesFromSchema(registerFormSchema);

type RegisterFormValues = InferType<typeof registerFormSchema>;
