import moment from "moment";
import type { CustomPropTypesValidator } from "./_types";

export const dateType: CustomPropTypesValidator = (props, propName, componentName) => {
  if (props[propName] !== "" && props[propName] !== null && !moment(props[propName]).isValid()) {
    return new Error(
      `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'dateType'). Validation failed.`
    );
  }
};

export const dateTypeRequired = ((props, propName, componentName) => {
  if (!moment(props[propName]).isValid()) {
    return new Error(
      `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'dateTypeRequired'). Validation failed.`
    );
  }
}) as CustomPropTypesValidator<true>; // <-- prop-types adds "isRequired", so just silence the error for now.
