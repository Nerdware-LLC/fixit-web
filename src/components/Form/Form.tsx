import {
  Formik,
  Form as FormikFormElement,
  type FormikConfig as FormikComponentProps,
  type FormikValues as BaseFormikValues,
} from "formik";
import { styled } from "@mui/material/styles";
import { formClassNames } from "./classNames";
import type { Simplify } from "type-fest";
import type { Schema as YupSchema } from "yup";

/**
 * A [`Formik`][formik-url]-integrated form component which provides a convenient
 * way to create a form with validation and submission logic.
 *
 * ### `Form` Sub-Components:
 *
 * - `FormSubmitButton` - A [`Formik`][formik-url]-integrated submit button which is disabled when
 *   the form is invalid.
 *
 * - `FormControlButtons` - A flexbox containing a `FormSubmitButton` and a `BackButton`.
 *
 * [formik-url]: https://formik.org/docs/overview
 */
export const Form = <FormValues extends BaseFormikValues = BaseFormikValues>({
  initialValues,
  validationSchema,
  validate,
  onSubmit,
  sx,
  style,
  className = "",
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
    <StyledFormikFormElement
      sx={sx}
      style={style}
      className={formClassNames.root + " " + className}
    >
      {children}
    </StyledFormikFormElement>
  </Formik>
);

/**
 * Mui-styled Formik <form> element which allows this <Form> component to take an `sx` prop.
 */
const StyledFormikFormElement = styled(FormikFormElement)({});

/**
 * The props for the `<Form />` component, which wrap the `<Formik />` component's props with
 * the following modifications/additions:
 *
 * - `children` is overwritten to `ReactNode` to exclude the render-prop pattern.
 * - `validationSchema` is overwritten to `YupSchema` to get rid of the `any` type.
 * - For styling, `sx` and `style` props are added via {@link StyledFormikFormElement}.
 *
 * @note The type for the `<Formik />` component's props is `FormikConfig` - not `FormikProps`,
 * which is what `<Formik />` passes to the form component or render prop of `<Formik />`. Here,
 * the `FormikConfig` type has been imported as `FormikComponentProps` to clarify its purpose.
 */
export type FormProps<FormValues extends BaseFormikValues = BaseFormikValues> = Simplify<
  Omit<FormikComponentProps<FormValues>, "children" | "validationSchema"> & {
    children: React.ReactNode; //                <-- exclude render-prop children
    validationSchema?: YupSchema<FormValues>; // <-- replace `any` with YupSchema
  } & Pick<React.ComponentProps<typeof StyledFormikFormElement>, "sx" | "style" | "className">
>;

/**
 * A validation function to provide to the `Form` component's optional `validate` prop.
 */
export type FormValidationFunction<FormValues extends BaseFormikValues = BaseFormikValues> =
  FormProps<FormValues>["validate"];
