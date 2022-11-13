import { isValidCurrencyInput } from "../../utils/currency";
import type { CustomPropTypesValidator } from "./_types";

export const currencyType: CustomPropTypesValidator = (props, propName, componentName) => {
  if (
    props[propName] !== "" &&
    props[propName] !== null &&
    !isValidCurrencyInput(props[propName])
  ) {
    return new Error(
      `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'currencyType'). Validation failed.`
    );
  }
};

export const currencyTypeRequired = ((props, propName, componentName) => {
  if (!isValidCurrencyInput(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'currencyTypeRequired'). Validation failed.`
    );
  }
}) as CustomPropTypesValidator<true>; // <-- prop-types adds "isRequired", so just silence the error for now.
