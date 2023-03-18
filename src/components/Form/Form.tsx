import { Formik, Form as FormikForm, type FormikHelpers } from "formik";
import { styled } from "@mui/material/styles";
import { FormSubmitButton } from "./FormSubmitButton";
import type { SxProps, Theme } from "@mui/material/styles";

export const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  style,
  sx,
  children,
  ...formikProps
}: {
  onSubmit: (
    formValues: any,
    formikHelpers?: FormikHelpers<typeof formValues>
  ) => void | Promise<void>;
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Formik>, "onSubmit">) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    {...formikProps}
  >
    <StyledFormikForm sx={sx} style={style}>
      {children}
    </StyledFormikForm>
  </Formik>
);

/**
 * Mui-styled Formik <form> element which allows this <Form> component to take an `sx` prop.
 */
const StyledFormikForm = styled(FormikForm)({});

Form.SubmitButton = FormSubmitButton;
