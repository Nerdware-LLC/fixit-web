export type CustomPropTypesValidator<IsRequired extends boolean = false> =
  IsRequired extends true
    ? CustomPropTypesValidatorFn & { isRequired: any }
    : CustomPropTypesValidatorFn;

export type CustomPropTypesValidatorFn = (
  props: Record<string, any>,
  propName: string,
  componentName: string
) => Error | void;
