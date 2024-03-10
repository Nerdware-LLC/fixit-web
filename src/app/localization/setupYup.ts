import { setLocale } from "yup";

setLocale({
  mixed: {
    required: ({ label: fieldName }) => `Please provide a ${fieldName}`,
  },
  string: {
    min: "Must be at least ${min} characters long",
    max: "Must be fewer than ${max} characters",
  },
});
