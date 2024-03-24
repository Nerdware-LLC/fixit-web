import { setLocale, type Message } from "yup";

setLocale({
  mixed: {
    required: ({ label: fieldName }) => `Please provide a ${fieldName}`,
  },
  string: {
    min: "Must be at least ${min} characters long",
    max: "Must be fewer than ${max} characters",
  },
} as const satisfies Record<
  string, // "mixed" | "string"
  Record<
    string, // "required", "min", "max"
    Message<{ [key: string]: unknown }> // <-- overrides Message default type param `any`
  >
>);
