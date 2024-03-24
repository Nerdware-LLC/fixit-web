import { useState, useEffect } from "react";
import { useFormikContext, type FormikState } from "formik";
import { jwtDecode } from "jwt-decode";
import DialogTitle from "@mui/material/DialogTitle";
import Text from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import { useFetchStateContext } from "@/app/FetchStateContext/useFetchStateContext";
import { globalAnimations } from "@/app/GlobalStyles/animations";
import { CloseIconButton } from "@/components/Buttons/CloseIconButton";
import { Dialog } from "@/components/Dialog";
import { GoogleOAuthButton, type GoogleOAuthButtonProps } from "./GoogleOAuthButton";
import type { CredentialResponse } from "@/types/googleOAuth";
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

export type GoogleAuthFormButtonProps<AuthFormValues extends BaseAuthFormValues> =
  OverrideProperties<
    Except<GoogleOAuthButtonProps, "onSuccess" | "onError">,
    {
      text: Extract<GoogleOAuthButtonProps["text"], "signin_with" | "signup_with">;
    }
  > & {
    /**
     * Required-field input elements to be displayed in the "required-fields" Dialog if their
     * respective values are not present in the Form context upon the User's completion of the
     * Google OAuth prompt flow.
     */
    requiredFieldInputs: React.ReactNode;
    /**
     * A hook for transforming the Formik state object. After the User completes the Google OAuth
     * prompt flow, this component makes a best effort to ascertain desired values for Formik state
     * objects — `values`, `errors`, and `touched` — using a combination of the Google OAuth2 ID
     * token and current Form state. It then passes these values to `beforeSetFormikState` to allow
     * the User to configure the Formik state as desired.
     * > Use this function to handle state updates for form fields this component does not handle.
     */
    beforeSetFormikState?: (
      formikState: FormikValuesErrorsTouched<AuthFormValues>
    ) => FormikValuesErrorsTouched<AuthFormValues>;
  };

/**
 * A button that prompts the User to sign in or sign up with Google OAuth2. When the User
 * completes the Google OAuth prompt flow, this component makes a best effort to ascertain
 * desired values for Formik state objects — `values`, `errors`, and `touched` — for the
 * following common auth-form fields:
 *
 *   - `email`
 *   - `googleIDToken`
 *   - `password`
 *
 * Other form fields are supported via hook props like `beforeSetFormikState`.
 */
export const GoogleAuthFormButton = <AuthFormValues extends BaseAuthFormValues>({
  text, // "signin_with" or "signup_with"
  requiredFieldInputs,
  beforeSetFormikState,
  ...googleOAuthButtonProps
}: GoogleAuthFormButtonProps<AuthFormValues>) => {
  const formikContext = useFormikContext<AuthFormValues>();
  const { values, errors, touched } = formikContext;
  const { setValues, setErrors, setTouched, validateForm, handleSubmit } = formikContext;

  const { setError: setFetchError } = useFetchStateContext();
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();
  const [shouldWiggle, setShouldWiggle] = useState(false);

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
        if (payload?.email) newEmailValue = payload.email;
      } catch {
        handleError();
        return;
      }
    }

    // Pass the Formik state to the `beforeSetFormikState` function to allow for any additional
    // state updates that are not handled by the `GoogleAuthFormButton` component itself.
    let newFormikState: FormikValuesErrorsTouched<AuthFormValues> = {
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

    // If `beforeSetFormikState` was provided, use it to update the Formik state object
    if (beforeSetFormikState) newFormikState = beforeSetFormikState(newFormikState);

    // Perform all state updates at once via `setFormikState`
    await setValues(newFormikState.values, true);
    await setTouched(newFormikState.touched, false);
    setErrors(newFormikState.errors);

    // If the new state lists any errors, open the "required-fields" Dialog, else submit the form
    if (Object.values(newFormikState.errors).some(Boolean)) openDialog();
    else setShouldSubmit(true); // TODO <-- replace this with `handleSubmit` once Formik PR is merged
  };

  /** When the User clicks "OK", validate the form and close the dialog if there are no errors. */
  const handleAcceptDialog = async () => {
    await validateForm();

    if (Object.values(errors).some(Boolean)) {
      setShouldWiggle(true);
      setTimeout(() => setShouldWiggle(false), 1000);
    } else {
      handleCloseDialog();
    }
  };

  /** Close dialog, submit form. */
  const handleCloseDialog = () => {
    closeDialog();
    handleSubmit();
  };

  const { dialogTitle, promptMessage } =
    text === "signup_with"
      ? {
          dialogTitle: "Sign Up with Google",
          promptMessage: "Please provide these required fields to complete your registration:",
        }
      : {
          dialogTitle: "Sign In with Google",
          promptMessage: "Please provide these required fields to continue:",
        };

  return (
    <>
      <GoogleOAuthButton
        text={text} // "signin_with" or "signup_with"
        onSuccess={handleSuccess}
        onError={handleError}
        {...googleOAuthButtonProps}
      />
      <Dialog
        title={
          <DialogTitle
            color="secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
          >
            <GoogleIcon /> {dialogTitle}
            <CloseIconButton onClick={closeDialog} />
          </DialogTitle>
        }
        isVisible={isDialogVisible}
        handleAccept={handleAcceptDialog}
        onClose={handleCloseDialog}
        PaperProps={{ className: shouldWiggle ? globalAnimations.wiggleX.className : undefined }}
        dialogContentProps={{
          sx: {
            padding: "1.5rem 1.5rem 0.5rem 1.5rem",
            gap: "0.5rem !important",
          },
        }}
      >
        <Text style={{ marginBottom: "1rem" }}>{promptMessage}</Text>
        {requiredFieldInputs}
      </Dialog>
    </>
  );
};
