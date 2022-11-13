import React from "react";
import { Formik } from "formik";
import { FormSubmitButton } from "./FormSubmitButton";
import { object, any, func, bool } from "../../types";

// Formik will throw if number of children > 1, hence the fragment.

export const Form = ({
  onSubmit,
  submitButton = false,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Formik>, "onSubmit"> & {
  onSubmit: Function;
  submitButton?: boolean;
  children: React.ReactNode;
}) => (
  <Formik onSubmit={onSubmit as React.ComponentProps<typeof Formik>["onSubmit"]} {...props}>
    <>
      {children}
      {!!submitButton && <FormSubmitButton />}
    </>
  </Formik>
);

Form.propTypes = {
  initialValues: object.isRequired,
  validationSchema: any.isRequired,
  onSubmit: func.isRequired,
  children: any.isRequired,
  submitButton: bool
};
