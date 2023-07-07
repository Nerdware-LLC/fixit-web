import React, { useState, useEffect } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import {
  StyledAutoComplete,
  type StyledAutoCompleteProps,
} from "@components/Inputs/StyledAutoComplete";
import { formClassNames } from "./classNames";
import { useFormikFieldProps } from "./useFormikFieldProps";
import type { AutocompleteValue } from "@mui/base/useAutocomplete";
import type { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";

/**
 * A MUI Autocomplete with Formik integration which takes an optional type
 * arg `OptionType` which defaults to `AutoCompleteOption` if not specified.
 * Options must at least contain an `id` property, as well as a `label`
 * property unless `getOptionLabel` is provided and the function utilizes
 * other option properties. See `AutoCompleteProps` for more type info.
 *
 * This component is a controlled MUI Autocomplete, which necessitates the
 * management of two separate state values:
 *
 * 1. `inputValue`: The value of the text input at any given time during focused
 *    input, which is managed here with internal state var `textFieldValue`.
 *
 * 2. `value`: The form field's selected value, which is managed here with internal
 *    state var `selectedOption` and Formik ctx hook `setFieldValue`.
 */
export const AutoComplete = <
  OptionT extends AutoCompleteOption = AutoCompleteOption,
  FreeSolo extends boolean = false
>({
  id,
  label,
  options,
  isOptionEqualToValue,
  doAfterSetSelectedOption,
  // value-determining props:
  freeSolo,
  isValueNullable = true,
  // behavior-determining props:
  autoComplete = true,
  autoHighlight = true,
  autoSelect = false,
  blurOnSelect = true,
  clearOnEscape = true,
  includeInputInList = true,
  openOnFocus = true,
  renderInput,
  variant: explicitTextFieldVariant,
  placeholder: explicitPlaceholder,
  InputProps: explicitTextFieldInputProps = {},
  emptySelectionOption,
  style,
  ...props
}: AutoCompleteProps<OptionT, FreeSolo>) => {
  const [
    { value: fieldValue, error: fieldIsInvalid, helperText: fieldErrorMessage, variant },
    { setValue: setFormFieldValue },
  ] = useFormikFieldProps({
    id,
    variant: explicitTextFieldVariant,
    placeholder: explicitPlaceholder,
  });

  const [selectedOption, setSelectedOption] = useState<AutoCompleteValues<OptionT, FreeSolo>>(null);
  const [textFieldValue, setTextFieldValue] = useState("");

  /* This useEffect ensures that if the form field's value is set externally,
  the input is updated accordingly to reflect the new value. For example, during
  create operations in the InvoiceForm, the selection of a WorkOrder will cause
  the assignedTo input to reflect the WO's createdBy User.  */
  useEffect(() => {
    if (fieldValue !== ((selectedOption as any)?.id ?? selectedOption)) {
      const newSelectedOptionValue = fieldValue
        ? options.find((option) => fieldValue === option?.id ?? option)
        : null;
      setSelectedOption(newSelectedOptionValue ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue]);

  const handleChangeSelectedOption = (
    event: React.SyntheticEvent<Element, Event>,
    value: AutoCompleteValues<OptionT, FreeSolo>
  ) => {
    setSelectedOption(value);
    setFormFieldValue(
      typeof value === "string"
        ? value
        : !!value && value?.id
        ? value.id
        : isValueNullable
        ? null
        : ""
    );
    if (doAfterSetSelectedOption) doAfterSetSelectedOption(value);
  };

  const handleChangeTextInput = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setTextFieldValue(newInputValue);
  };

  // Assign a default isOptionEqualToValue if one isn't provided
  isOptionEqualToValue ??= (option, value) => (option?.id ?? option) === (value?.id ?? value);

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

  return (
    <StyledAutoComplete<OptionT, false, false, FreeSolo>
      id={id}
      options={options}
      // state values and handlers:
      value={selectedOption}
      onChange={handleChangeSelectedOption}
      inputValue={textFieldValue}
      onInputChange={handleChangeTextInput}
      isOptionEqualToValue={isOptionEqualToValue}
      // autocomplete behavior props:
      autoComplete={autoComplete}
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      blurOnSelect={blurOnSelect}
      clearOnEscape={clearOnEscape}
      disableClearable={false}
      includeInputInList={includeInputInList}
      multiple={false}
      openOnFocus={openOnFocus}
      // aesthetic props and the rest:
      renderInput={renderInput}
      noOptionsText={emptySelectionOption?.label ?? "--"}
      style={style}
      className={formClassNames.autoCompleteInput}
      {...props}
    />
  );
};

/**
 * A wrapper type around the `AutocompleteValue` generic exported by `@mui/base/useAutocomplete`.
 * Type params `Multiple` and `DisableClearable` are set to false since they're not supported by
 * this component.
 */
export type AutoCompleteValues<
  OptionType extends AutoCompleteOption = AutoCompleteOption,
  FreeSolo extends boolean = false
> = AutocompleteValue<OptionType, false, false, FreeSolo>;

/**
 * The base type for AutoComplete props. An optional type arg `OptionType` can
 * be provided to specify the type of option objects. If not provided, this type
 * parameter defaults to `AutoCompleteOption`.
 *
 * **STATE HOOKS:**
 * - Use `doAfterSetSelectedOption` to perform additional operations with the
 *   selected option.
 *
 * **USAGE NOTES:**
 * - For grouped options, each option must have a `group` property string value.
 * - Use the `emptySelectionOption` prop to provide a custom option for empty/null
 *   selections.
 * - The following props, if provided, will be provided to the default `renderInput`
 *   TextField component:
 *   - `variant`
 *   - `InputProps`
 */
export type AutoCompleteProps<
  OptionType extends AutoCompleteOption = AutoCompleteOption,
  FreeSolo extends boolean = false
> = Omit<
  StyledAutoCompleteProps<OptionType, false, false, FreeSolo>,
  "renderInput" // re-written below, converted to optional
> & {
  id: string;
  label?: React.ReactNode;
  doAfterSetSelectedOption?: (option: AutoCompleteValues<OptionType, FreeSolo>) => void;
  isValueNullable?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  variant?: TextFieldProps["variant"]; //       given to default renderInput TextField
  InputProps?: TextFieldProps["InputProps"]; // given to default renderInput TextField
  groupBy?: (option: OptionType & { group: string }) => string;
  emptySelectionOption?: OptionType | AutoCompleteOption;
};

export interface AutoCompleteOption {
  id: string;
  label?: string;
  group?: string;
  [K: string]: any;
}

export type AutoCompleteOptions = Array<AutoCompleteOption>;
