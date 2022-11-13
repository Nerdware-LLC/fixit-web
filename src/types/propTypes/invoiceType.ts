import { exact, shape, oneOf, string, type Validator } from "prop-types";
import { idType } from "./idType";
import { workOrderType } from "./workOrderType";
import { fixitUserType } from "./fixitUserType";
import { currencyType, currencyTypeRequired } from "./currencyType";
import { dateType, dateTypeRequired } from "./dateType";
import { INVOICE_CONSTANTS } from "../Invoice.type";

export const invoiceType = shape({
  id: idType.isRequired,
  createdBy: fixitUserType.isRequired,
  assignedTo: fixitUserType.isRequired,
  amount: currencyTypeRequired.isRequired,
  status: oneOf(INVOICE_CONSTANTS.STATUSES).isRequired,
  stripePaymentIntentID: string,
  workOrder: workOrderType,
  createdAt: dateTypeRequired.isRequired,
  updatedAt: dateType as Validator<any>
});

export const invoiceInputType = exact({
  workOrderID: idType,
  amount: currencyType as Validator<any>
});
