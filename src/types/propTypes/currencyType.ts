import { isValidCurrencyInput } from "@utils/currency";
import type { Validator, Requireable } from "prop-types";

export const currencyType: Validator<string> = (props, propName, componentName) => {
  return props[propName] !== "" &&
    props[propName] !== null &&
    !isValidCurrencyInput(props[propName])
    ? new Error(
        `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'currencyType'). Validation failed.`
      )
    : null;
};

const _currencyTypeRequired: Validator<string> = (props, propName, componentName) => {
  return !isValidCurrencyInput(props[propName])
    ? new Error(
        `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'currencyTypeRequired'). Validation failed.`
      )
    : null;
};

// prop-types adds "isRequired", so just silence the error for now
export const currencyTypeRequired = _currencyTypeRequired as Requireable<Validator<string>>;
