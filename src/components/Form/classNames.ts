import { checklistInputClassNames } from "./inputs/ChecklistInput/classNames";

/**
 * Class names for `Form` components (src/components/Form/).
 *
 * This object includes {@link checklistInputClassNames} exported from the `ChecklistInput`
 * component under the key `checklistInput`.
 *
 * // TODO mv input-specific classNames to ./inputs/classNames.ts
 */
export const formClassNames = {
  root: "form__root",
  // form inputs:
  autoCompleteInput: "form__auto-complete-input",
  checklistInput: {
    ...checklistInputClassNames,
  },
  currencyInput: "form__currency-input",
  dateInput: "form__date-input",
  dateTimeInput: "form__date-time-input",
  passwordInput: "form__password-input",
  phoneInput: "form__phone-input",
  sliderInput: "form__slider-input",
  sliderInputContainer: "form__slider-input__container",
  sliderInputLabel: "form__slider-input__label",
  selectInput: "form__select-input",
  textInput: "form__text-input",
  // form buttons:
  submitButton: "form__submit-button",
  controlButtonsContainer: "form__control-buttons-container",
} as const;
