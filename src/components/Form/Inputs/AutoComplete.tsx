import { useState, useEffect } from "react";
import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiAutocomplete, {
  type AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { getTypeSafeError } from "@/utils/typeSafety/getTypeSafeError";
import { formClassNames } from "../classNames";
import { useFormikFieldProps, type FormikIntegratedInputProps } from "../helpers";
import type { AutocompleteValue } from "@mui/base/useAutocomplete";
import type { Simplify, SetRequired, SetOptional } from "type-fest";

/**
 * A MUI Autocomplete with Formik integration which takes an optional type arg `OptionType` which
 * defaults to {@link BaseAutoCompleteOption|`BaseAutoCompleteOption`} if not specified. Options
 * must at least contain an `id` field, as well as a `label` unless `getOptionLabel` is provided
 * and the function utilizes other option properties. See {@link AutoCompleteProps} for more type
 * info.
 *
 * This component is a controlled MUI Autocomplete, which necessitates the management of two
 * separate state values:
 *
 *   1. `inputValue`: The value of the text input at any given time during focused
 *      input, which is managed here with internal state var `textFieldValue`.
 *
 *   2. `value`: The form field's selected value, which is managed here with internal
 *      state var `selectedOption` and Formik ctx hook `setFieldValue`.
 */
export const AutoComplete = <
  OptionType extends BaseAutoCompleteOption = BaseAutoCompleteOption,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false,
  ChipComponent extends React.ElementType = "div",
>({
  id,
  label,
  options,
  getFieldValueFromOption: caller_getFieldValueFromOption,
  getOptionFromFieldValue: caller_getOptionFromFieldValue,
  onChange: caller_onChange,
  onInputChange: caller_onInputChange,
  // behavior-determining props:
  autoComplete = true,
  autoHighlight = true,
  autoSelect = false,
  blurOnSelect = true,
  clearOnEscape = true,
  includeInputInList = true,
  openOnFocus = true,
  // aesthetic props and the rest:
  renderInput,
  variant: explicitTextFieldVariant,
  placeholder: explicitPlaceholder,
  InputProps: explicitTextFieldInputProps = {},
  style,
  ...autoCompleteProps
}: AutoCompleteProps<OptionType, Multiple, DisableClearable, FreeSolo, ChipComponent>) => {
  // Short-hand for the type of the Autocomplete's `value` prop:
  type ValuePropType = AutocompleteValue<OptionType, Multiple, DisableClearable, FreeSolo>;

  const [selectedOption, setSelectedOption] = useState<ValuePropType | null>(null);
  const [textFieldValue, setTextFieldValue] = useState("");

  const [
    { value: fieldValue, error: fieldIsInvalid, helperText: fieldErrorMessage, variant },
    { setValue: setFormFieldValue, setError: setFormFieldErrorMessage },
  ] = useFormikFieldProps<string | null>({
    fieldID: id,
    variant: explicitTextFieldVariant,
    placeholder: explicitPlaceholder,
  });

  // Defaults for getFieldValueFromOption and getOptionFromFieldValue:

  const getFieldValueFromOption = caller_getFieldValueFromOption
    ? caller_getFieldValueFromOption
    : (opt: OptionType | ValuePropType | null) => {
        const targetFieldValue = !!opt && "id" in opt ? opt.id : opt;
        return targetFieldValue as string | null;
      };

  const getOptionFromFieldValue = caller_getOptionFromFieldValue
    ? caller_getOptionFromFieldValue
    : (fieldValueArg: string | null) => {
        const targetOption = fieldValueArg
          ? options.find((opt) => opt.id === fieldValueArg) ?? fieldValueArg
          : fieldValueArg;
        return targetOption as ValuePropType;
      };

  /* This useEffect ensures that if the form field's value is set externally, the input is updated
  accordingly to reflect the new value. For example, during create operations in InvoiceForm, the
  selection of a WorkOrder will cause the assignedTo input to reflect the WO's createdBy User. */
  useEffect(() => {
    if (fieldValue !== getFieldValueFromOption(selectedOption)) {
      const newFieldValue = getOptionFromFieldValue(fieldValue);
      // Ensure newFieldValue !undefined, which would cause Mui to think the comp is uncontrolled.
      if (newFieldValue !== undefined) setSelectedOption(newFieldValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue]);

  const handleChangeSelectedOption: AutoCompleteOnChangeFn<
    OptionType,
    Multiple,
    DisableClearable,
    FreeSolo
  > = async (event, option, reason, details) => {
    setSelectedOption(option);
    try {
      await setFormFieldValue(getFieldValueFromOption(option));
      if (caller_onChange) await caller_onChange(event, option, reason, details);
    } catch (error) {
      setFormFieldErrorMessage(getTypeSafeError(error).message);
    }
  };

  const handleChangeTextInput: AutoCompleteOnInputChangeFn = async (
    event,
    newInputValue,
    reason
  ) => {
    setTextFieldValue(newInputValue);
    if (caller_onInputChange) await caller_onInputChange(event, newInputValue, reason);
  };

  // Assign a default renderInput if one isn't provided
  renderInput ??= ({ InputProps, ...params }) => (
    <TextField
      {...params}
      label={label}
      variant={variant}
      error={fieldIsInvalid}
      helperText={fieldErrorMessage}
      InputProps={{
        ...InputProps,
        ...explicitTextFieldInputProps,
      }}
    />
  );

  // FOR THE `value` PROP, `||` is used over `??` to ensure empty strings are not provided as `value` prop.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const autoCompleteValue = selectedOption || (null as ValuePropType);

  return (
    <StyledAutoComplete<OptionType, Multiple, DisableClearable, FreeSolo, ChipComponent>
      id={id}
      options={options}
      // state values and handlers:
      value={autoCompleteValue}
      onChange={handleChangeSelectedOption}
      inputValue={textFieldValue}
      onInputChange={handleChangeTextInput}
      // autocomplete behavior props:
      autoComplete={autoComplete}
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      blurOnSelect={blurOnSelect}
      clearOnEscape={clearOnEscape}
      includeInputInList={includeInputInList}
      openOnFocus={openOnFocus}
      // aesthetic props and the rest:
      renderInput={renderInput}
      className={formClassNames.autoCompleteInput}
      style={style}
      {...autoCompleteProps}
    />
  );
};

const StyledAutoComplete = styled(MuiAutocomplete, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as typeof MuiAutocomplete;

/**
 * The base type for AutoComplete props. An optional type arg `OptionType` can be provided
 * to specify the type of option objects. If not provided, this type parameter defaults to
 * {@link BaseAutoCompleteOption|`BaseAutoCompleteOption`}.
 *
 * ### State Hooks:
 * - Use `doAfterSetSelectedOption` to perform additional operations with the selected option.
 *
 * ### Usage Notes:
 * - For grouped options, each option must have a `group` property string value.
 * - Use the `emptySelectionOption` prop to provide a custom option for empty/null selections.
 * - The following props, if provided, will be provided to the default `renderInput` TextField comp:
 *   - `variant`
 *   - `InputProps`
 */
export type AutoCompleteProps<
  BaseOptionType extends BaseAutoCompleteOption = BaseAutoCompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = "div",
> = Simplify<
  SetOptional<
    FormikIntegratedInputProps<
      MuiAutocompleteProps<BaseOptionType, Multiple, DisableClearable, FreeSolo, ChipComponent>,
      "onChange" | "onInputChange"
    >,
    "renderInput"
  > & {
    groupBy?: (option: SetRequired<BaseOptionType, "group">) => string;
    // Custom functions:
    getFieldValueFromOption?: AutoCompleteGetFieldValueFromOptionFn<BaseOptionType, Multiple, DisableClearable, FreeSolo>; // prettier-ignore
    getOptionFromFieldValue?: AutoCompleteGetOptionFromFieldValueFn<BaseOptionType, Multiple, DisableClearable, FreeSolo>; // prettier-ignore
  } & Pick<TextFieldProps, "label" | "variant" | "placeholder" | "InputProps"> & // <-- props passed to default renderInput TextField
    MuiGridSxProps
>;

///////////////////////////////////////////////////////////////////////////////
// AutoComplete utility types:

/**
 * The base/default type used for the first type parameter of {@link AutoCompleteProps}.
 */
export type BaseAutoCompleteOption = {
  id: string;
  label?: string;
  group?: string;
  [K: string]: unknown;
};

/**
 * An array of {@link BaseAutoCompleteOption} objects.
 */
export type BaseAutoCompleteOptions = Array<BaseAutoCompleteOption>;

///////////////////////////////////////////////////////////////////////////////
// AutoComplete function types:

/**
 * `getFieldValueFromOption` function type for {@link AutoComplete}.
 */
export type AutoCompleteGetFieldValueFromOptionFn<
  OptionType extends BaseAutoCompleteOption = BaseAutoCompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> = (
  option: OptionType | AutocompleteValue<OptionType, Multiple, DisableClearable, FreeSolo> | null
) => string | null;

/**
 * `getOptionFromFieldValue` function type for {@link AutoComplete}.
 */
export type AutoCompleteGetOptionFromFieldValueFn<
  OptionType extends BaseAutoCompleteOption = BaseAutoCompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> = (
  fieldValue: string | null
) => AutocompleteValue<OptionType, Multiple, DisableClearable, FreeSolo>;

/**
 * `renderInput` function type for {@link AutoComplete}.
 * @note The `renderInput` function's type does not use any of the AutoComplete type params.
 */
export type AutoCompleteRenderInputFn = NonNullable<
  MuiAutocompleteProps<BaseAutoCompleteOption, false, false, false>["renderInput"]
>;

/**
 * `onChange` function type for {@link AutoComplete}.
 */
export type AutoCompleteOnChangeFn<
  OptionType extends BaseAutoCompleteOption = BaseAutoCompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> = NonNullable<MuiAutocompleteProps<OptionType, Multiple, DisableClearable, FreeSolo>["onChange"]>;

/**
 * `onInputChange` function type for {@link AutoComplete}.
 * @note The `onInputChange` function's type does not use any of the AutoComplete type params.
 */
export type AutoCompleteOnInputChangeFn = NonNullable<
  MuiAutocompleteProps<BaseAutoCompleteOption, false, false, false>["onInputChange"]
>;
