import { Formik, type FormikHelpers } from "formik";
import { FormSubmitButton } from "./FormSubmitButton";

export const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Formik>, "onSubmit"> & {
  onSubmit: (
    formValues: any,
    formikHelpers?: FormikHelpers<typeof formValues>
  ) => void | Promise<void>;
  children: React.ReactNode;
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    {...props}
  >
    <>
      {children}
      {/* Formik will throw if number of children > 1, hence the fragment. */}
    </>
  </Formik>
);

Form.SubmitButton = FormSubmitButton;
