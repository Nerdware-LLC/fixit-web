import { checklistInputClassNames } from "./ChecklistInput/classNames.js";

/**
 * Class names for `Form/Inputs` components (src/components/Form/Inputs/).
 */
export const formInputsClassNames = {
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
} as const;
