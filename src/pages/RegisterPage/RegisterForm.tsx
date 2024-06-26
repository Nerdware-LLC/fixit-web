import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, type InferType } from "yup";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { GoogleAuthFormButton } from "@/app/GoogleOAuthContext/GoogleAuthFormButton.jsx";
import { DividerWithText } from "@/components/DataDisplay";
import { Form, FormSubmitButton } from "@/components/Form";
import { UserHandleInput, EmailInput, PasswordInput, PhoneInput } from "@/components/Form/Inputs";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";
import { ErrorDialog } from "@/components/Indicators";
import { APP_PATHS } from "@/routes/appPaths.js";
import { authService } from "@/services/authService.js";

export const RegisterForm = () => {
  const nav = useNavigate();
  const { fetchWithState, error, clearError } = useFetchStateContext();

  const handleSubmit = async ({
    handle,
    password,
    googleIDToken,
    ...values
  }: RegisterFormValues) => {
    const apiResponse = await fetchWithState(
      async () =>
        await authService.registerNewUser({
          handle: `@${handle}`, // <-- "@" prefix added to "handle"
          ...(password
            ? { password } // Send one of `password` or `googleIDToken`
            : { googleIDToken: googleIDToken! }),
          ...values,
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
    >
      <UserHandleInput id="handle" />
      <PhoneInput id="phone" />
      <EmailInput id="email" />
      <PasswordInput id="password" autoComplete="new-password" />
      <FormSubmitButton />

      {error && <ErrorDialog title="Invalid Input" error={error} onDismiss={clearError} />}

      <DividerWithText flexItem>OR</DividerWithText>

      <GoogleAuthFormButton<RegisterFormValues>
        text="signup_with"
        beforeSetFormikState={({ values, errors, touched, ...formikState }) => ({
          ...formikState,
          values: {
            ...values,
            /* Since the OAuth flow is intended to be expeditious, it's desirable to
            ensure that the User can proceed to the next step without interruption.
            To that end, optional fields like `phone` here are cleared/reset if their
            value is invalid, thereby ensuring form submission isn't blocked. */
            phone: values.phone && !errors.phone ? values.phone : null,
          },
          errors: {
            ...errors,
            phone: undefined, // <-- phone is set to null if invalid, so rm any existing errors
            handle: !values.handle
              ? "Please choose a user handle (this is how other users will identify you)"
              : errors.handle, // <-- will be undefined unless the User's value is invalid
          },
          touched: {
            ...touched,
            phone: true,
            handle: true,
          },
        })}
        requiredFieldInputs={
          <>
            <UserHandleInput id="handle" />
            <EmailInput id="email" />
          </>
        }
      />
    </Form>
  );
};

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
const registerFormSchema = yupObject({
  handle: yupCommonSchema.string
    .lowercase()
    .test({
      name: "is-right-length",
      message: "User handles must be between 3-50 characters",
      test: (value) => value?.length >= 3 && value?.length <= 50,
    })
    .test({
      name: "no-banned-chars",
      message: "User handles must only contain letters, numbers, and underscores",
      test: (value) => /^[a-z0-9_]{3,50}$/i.test(value),
    })
    .required("Please choose a user handle (this is how other users will identify you)"),
  email: yupCommonSchema.email.required("Please provide an email"),
  phone: yupCommonSchema.phone.nullable().default(null),
  password: yupCommonSchema.password,
  googleIDToken: yupCommonSchema.googleIDToken,
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
const registerFormInitialValues = getInitialValuesFromSchema(registerFormSchema);

type RegisterFormValues = InferType<typeof registerFormSchema>;
