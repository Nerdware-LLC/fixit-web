import { Formik, Form as FormikFormElement, type FormikValues, type FormikHelpers } from "formik";
import { styled } from "@mui/material/styles";
import { FormControlButtons } from "./FormControlButtons";
import { FormSubmitButton } from "./FormSubmitButton";
import { formClassNames } from "./classNames";
import type { SxProps, Theme } from "@mui/material/styles";

export const Form = <FormValues extends FormikValues = FormikValues>({
  initialValues,
  validationSchema,
  validate,
  onSubmit,
  style,
  sx,
  children,
  ...formikProps
}: FormProps<FormValues>) => (
  <Formik<FormValues>
    initialValues={initialValues}
    validationSchema={validationSchema}
    validate={validate}
    onSubmit={onSubmit}
    {...formikProps}
  >
    <StyledFormikFormElement sx={sx} style={style} className={formClassNames.root}>
      {children}
    </StyledFormikFormElement>
  </Formik>
);

/**
 * Mui-styled Formik <form> element which allows this <Form> component to take an `sx` prop.
 */
const StyledFormikFormElement = styled(FormikFormElement)({});

// Some convenient attachments:
Form.SubmitButton = FormSubmitButton;
Form.ControlButtons = FormControlButtons;

export type FormProps<FormValues extends FormikValues = FormikValues> = {
  onSubmit: (formValues: any, formikHelpers?: FormikHelpers<any>) => void | Promise<void>;
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Formik<FormValues>>, "onSubmit">;
