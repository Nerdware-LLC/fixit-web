import { object as yupObject, string, date, type InferType } from "yup";
import { yupBaseChecklistSchema } from "@/components/Form/Inputs/ChecklistInput/helpers.js";
import { yupCommonSchema } from "@/components/Form/helpers/yupCommonSchema.js";
import { WORK_ORDER_CATEGORIES, WORK_ORDER_PRIORITIES } from "@/types/WorkOrder.js";

export const workOrderFormSchema = yupObject({
  assignedTo: yupObject({
    id: yupCommonSchema.string.required(),
  })
    .nullable()
    .default(null),
  location: yupObject({
    country: yupCommonSchema.string.min(3).default("USA"),
    region: yupCommonSchema.string.min(3).required("Required"),
    city: yupCommonSchema.string.min(3).required("Required"),
    streetLine1: yupCommonSchema.string.min(3).required("Required"),
    streetLine2: yupCommonSchema.stringNullable.min(3),
  }).required("Required"),
  category: yupCommonSchema.stringNullable.oneOf(WORK_ORDER_CATEGORIES),
  description: yupCommonSchema.stringNullable,
  checklist: yupBaseChecklistSchema.nullable().default(null),
  priority: string().oneOf(WORK_ORDER_PRIORITIES).default("NORMAL"),
  entryContact: yupCommonSchema.stringNullable,
  entryContactPhone: yupCommonSchema.phone.nullable().default(null),
  dueDate: date().nullable().default(null),
  scheduledDateTime: date().nullable().default(null),
});

export type WorkOrderFormValues = InferType<typeof workOrderFormSchema>;
