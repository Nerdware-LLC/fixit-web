import { string, arrayOf, bool, shape } from "prop-types";
import { idType } from "./idType";

export const checklistItemType = shape({
  id: idType.isRequired,
  description: string.isRequired,
  isCompleted: bool.isRequired
});

export const checklistItemInputType = shape({
  id: idType,
  description: string,
  isCompleted: bool.isRequired
});

export const checklistType = arrayOf(checklistItemType);
