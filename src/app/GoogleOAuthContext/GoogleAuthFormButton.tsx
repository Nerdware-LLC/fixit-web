import { useState, useEffect } from "react";
import { useFormikContext, type FormikState } from "formik";
import { jwtDecode } from "jwt-decode";
import { useFetchStateContext } from "@/app/FetchStateContext/useFetchStateContext.js";
import { GoogleOAuthButton, type GoogleOAuthButtonProps } from "./GoogleOAuthButton.jsx";
import type { CredentialResponse } from "@/types/googleOAuth.js";
import type { Except, OverrideProperties } from "type-fest";

type BaseAuthFormValues = {
  [key: PropertyKey]: unknown;
  // Fields used in both registration and login forms:
  email: string;
  googleIDToken: string | null;
  password: string | null;
};

type FormikValuesErrorsTouched<AuthFormValues extends BaseAuthFormValues> = Pick<
  FormikState<AuthFormValues>,
  "values" | "errors" | "touched"
>;

export type GoogleAuthFormButtonProps = OverrideProperties<
  Except<GoogleOAuthButtonProps, "onSuccess" | "onError">,
  {
    text: Extract<GoogleOAuthButtonProps["text"], "signin_with" | "signup_with">;
  }
>;

/**
 * A button that prompts the User to sign in or sign up with Google OAuth2. When the User
 * completes the Google OAuth prompt flow, this component makes a best effort to ascertain
 * desired values for Formik state objects — `values`, `errors`, and `touched` — for the
 * following common auth-form fields:
 * - `email`
 * - `googleIDToken`
 * - `password`
 */
export const GoogleAuthFormButton = <AuthFormValues extends BaseAuthFormValues>({
  text, // "signin_with" or "signup_with"
  ...googleOAuthButtonProps
}: GoogleAuthFormButtonProps) => {
  const formikContext = useFormikContext<AuthFormValues>();
  const { values, errors, touched } = formikContext;
  const { setValues, setErrors, setTouched, handleSubmit } = formikContext;

  const { setError: setFetchError } = useFetchStateContext();

  // See below remarks regarding the Formik stale-values bug and workaround.
  // TODO Remove this state once Formik PR is merged
  const [shouldSubmit, setShouldSubmit] = useState(false);
  /**
   * EFFECT: Run `handleSubmit` when `shouldSubmit` is `true`.
   *
   * This effect is a workaround for an existing Formik bug whereby validation runs on
   * stale values if `touched` is manually updated, as is done in the `handleSuccess`
   * function below. Links to the relevant issue and PR are below. Once the PR is merged,
   * this effect can be removed, along with the `shouldSubmit` state (we'll be able to
   * just call `handleSubmit`).
   *
   * ISSUE: https://github.com/jaredpalmer/formik/issues/2083
   * PR:    https://github.com/jaredpalmer/formik/pull/3947
   *
   * // TODO Remove this useEffect and `shouldSubmit` state once Formik PR is merged
   */
  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit();
      setShouldSubmit(false);
    }
  }, [shouldSubmit, handleSubmit]);

  const handleError = () => {
    setFetchError(
      new Error(
        "Oops! We were unable to obtain valid login credentials from Google — please try again."
      )
    );
  };

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const googleIDToken = credentialResponse.credential;

    // If the User hasn't provided an email, try to extract it from the Google ID token:
    let newEmailValue = values.email;

    if (!newEmailValue) {
      try {
        const payload = jwtDecode<{ email?: string }>(googleIDToken);
        if (payload.email) newEmailValue = payload.email;
      } catch {
        handleError();
        return;
      }
    }

    // Pass the Formik state to the `beforeSetFormikState` function to allow for any additional
    // state updates that are not handled by the `GoogleAuthFormButton` component itself.
    const newFormikState: FormikValuesErrorsTouched<AuthFormValues> = {
      values: {
        ...values,
        googleIDToken,
        email: newEmailValue,
        password: null, // Ensure `password` is null
      },
      errors: {
        ...errors,
        googleIDToken: undefined, // Should already be undefined, but just in case
        email: newEmailValue ? undefined : "Please provide an email",
        password: undefined, // Is now null, so clear any errors
      },
      touched: {
        ...touched,
        googleIDToken: true,
        email: true,
        password: true,
      },
    };

    // Perform all state updates at once via `setFormikState`
    await setValues(newFormikState.values, true);
    await setTouched(newFormikState.touched, false);
    setErrors(newFormikState.errors);

    // If the new state does not contain errors, submit the form
    if (!Object.values(newFormikState.errors).some(Boolean)) setShouldSubmit(true);
    // TODO Replace above `setShouldSubmit` with `handleSubmit` once Formik PR is merged
  };

  return (
    <GoogleOAuthButton
      text={text} // "signin_with" or "signup_with"
      onSuccess={handleSuccess}
      onError={handleError}
      {...googleOAuthButtonProps}
    />
  );
};
