import { exact, oneOf, string, shape, type Validator } from "prop-types";
import { idType } from "./idType";
import { fixitUserType } from "./fixitUserType";
import { checklistType } from "./workOrderChecklistType";
import { dateType, dateTypeRequired } from "./dateType";
import { WORK_ORDER_CONSTANTS } from "../WorkOrder.type";

// NOTE using exact for workOrderType kept erroneously throwing a warning about the createdAt prop/key
export const workOrderType = shape({
  id: idType.isRequired,
  createdBy: fixitUserType.isRequired,
  assignedTo: fixitUserType,
  status: oneOf(WORK_ORDER_CONSTANTS.STATUSES).isRequired,
  address: string.isRequired,
  category: oneOf(WORK_ORDER_CONSTANTS.CATEGORIES),
  description: string.isRequired,
  checklist: checklistType,
  priority: oneOf(WORK_ORDER_CONSTANTS.PRIORITIES),
  entryContact: string,
  entryContactPhone: string,
  dueDate: dateType as Validator<any>,
  scheduledDateTime: dateType as Validator<any>,
  contractorNotes: string,
  createdAt: dateTypeRequired.isRequired
});

export const workOrderInputType = exact({
  assignedTo: idType,
  address: string,
  category: oneOf(WORK_ORDER_CONSTANTS.CATEGORIES),
  description: string,
  checklist: checklistType,
  priority: oneOf(WORK_ORDER_CONSTANTS.PRIORITIES),
  entryContact: string,
  entryContactPhone: string,
  dueDate: dateType as Validator<any>,
  scheduledDateTime: dateType as Validator<any>
});
