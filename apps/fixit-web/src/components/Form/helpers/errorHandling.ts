import { getErrorMessage } from "@nerdware/ts-type-safety-utils";

/**
 * Default error message for Form input components.
 */
export const DEFAULT_FORM_INPUT_ERR_MSG = "Oops! Something went wrong — please try again.";

/**
 * Form input error-message handler.
 * @returns the `error` arg if it is a `string`, else returns the {@link DEFAULT_FORM_INPUT_ERR_MSG}.
 */
export const getFormInputErrMsg = (error: unknown) => {
  return getErrorMessage(error) ?? DEFAULT_FORM_INPUT_ERR_MSG;
};
