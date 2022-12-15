import moment from "moment";
import type { Validator, Requireable } from "prop-types";

export const dateType: Validator<Date | undefined> = (props, propName, componentName) => {
  return props[propName] !== "" && props[propName] !== null && !moment(props[propName]).isValid()
    ? new Error(
        `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'dateType'). Validation failed.`
      )
    : null;
};

const _dateTypeRequired: Validator<Date> = (props, propName, componentName) => {
  return !moment(props[propName]).isValid()
    ? new Error(
        `Invalid prop '${propName}' supplied to component '${componentName}' (expected 'dateTypeRequired'). Validation failed.`
      )
    : null;
};

// prop-types adds "isRequired", so just silence the error for now
export const dateTypeRequired = _dateTypeRequired as Requireable<Validator<Date>>;
