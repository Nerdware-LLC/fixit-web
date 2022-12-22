import * as Yup from "yup";
import { CONSTANTS } from "@types";

const { CATEGORIES, PRIORITIES } = CONSTANTS.WORK_ORDER;

export const schema = Yup.object({
  assignedTo: Yup.string().nullable(),
  location: Yup.object({
    country: Yup.string()
      .min(3, "Must be at least 3 characters long.")
      .max(255, "Must be fewer than 255 characters long.")
      .default("USA"),
    region: Yup.string()
      .min(3, "Must be at least 3 characters long.")
      .max(255, "Must be fewer than 255 characters long.")
      .required("Required"),
    city: Yup.string()
      .min(3, "Must be at least 3 characters long.")
      .max(255, "Must be fewer than 255 characters long.")
      .required("Required"),
    streetLine1: Yup.string()
      .min(3, "Must be at least 3 characters long.")
      .max(255, "Must be fewer than 255 characters long.")
      .required("Required"),
    streetLine2: Yup.string()
      .min(3, "Must be at least 3 characters long.")
      .max(255, "Must be fewer than 255 characters long.")
      .nullable()
  }).required("Required"),
  category: Yup.string()
    .oneOf([...CATEGORIES])
    .nullable(),
  description: Yup.string()
    .min(3, "Must be at least 3 characters long.")
    .max(255, "Must be fewer than 255 characters long.")
    .nullable()
    .required("Required"),
  checklist: Yup.array(
    Yup.object({
      id: Yup.number().nullable(),
      localIndex: Yup.number(),
      description: Yup.string()
        .min(1, "Must be at least 1 character")
        .max(255, "Must be fewer than 255 characters")
        .nullable(),
      isCompleted: Yup.bool()
    })
  ).nullable(),
  priority: Yup.string()
    .oneOf([...PRIORITIES])
    .required(),
  entryContact: Yup.string().max(50).nullable(),
  entryContactPhone: Yup.string()
    .matches(/^\d{10}$/, "Must be a valid phone number")
    .nullable(),
  dueDate: Yup.date().nullable(),
  scheduledDateTime: Yup.date().nullable()
});
