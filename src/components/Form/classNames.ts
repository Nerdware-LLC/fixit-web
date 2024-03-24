import { formInputsClassNames } from "./Inputs/classNames";

/**
 * Class names for `Form` components (src/components/Form/).
 */
export const formClassNames = {
  root: "form__root",
  // form buttons:
  submitButton: "form__submit-button",
  controlButtonsContainer: "form__control-buttons-container",
  // form inputs:
  ...formInputsClassNames,
} as const;
