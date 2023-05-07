import { object as yupObject, string, array, bool, date } from "yup";
import { yupCommonSchema } from "@utils/formUtils/yupCommonSchema";
import { WORK_ORDER_CATEGORIES, WORK_ORDER_PRIORITIES } from "@/types/WorkOrder";

const NON_NULL_WO_CATEGORIES = WORK_ORDER_CATEGORIES.filter(
  (c) => typeof c === "string"
) as string[];

export const schema = yupObject({
  assignedTo: string().nullable(),
  location: yupObject({
    country: yupCommonSchema.string.min3Max250.default("USA"),
    region: yupCommonSchema.string.min3Max250.required("Required"),
    city: yupCommonSchema.string.min3Max250.required("Required"),
    streetLine1: yupCommonSchema.string.min3Max250.required("Required"),
    streetLine2: yupCommonSchema.string.min3Max250.nullable(),
  }).required("Required"),
  category: string().oneOf(NON_NULL_WO_CATEGORIES).nullable(),
  description: yupCommonSchema.string.min3Max250
    .nullable()
    .required("Please provide a description"),
  checklist: array(
    yupObject({
      id: string().nullable(),
      description: yupCommonSchema.string.max250
        .nullable()
        .required("Please provide a description"),
      isCompleted: bool(),
    })
  ).nullable(),
  priority: string().oneOf(WORK_ORDER_PRIORITIES).required(),
  entryContact: string().max(50, "Must be fewer than 50 characters").nullable(),
  entryContactPhone: string()
    .matches(/^\d{10}$/, "Must be a valid phone number")
    .nullable(),
  dueDate: date().nullable(),
  scheduledDateTime: date().nullable(),
});
