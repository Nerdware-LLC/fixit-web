import React, { useState } from "react";
import { useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiAutoComplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { AutocompleteProps, AutocompleteRenderInputParams } from "@mui/material/Autocomplete";

/**
 * This component is a controlled MUI Autocomplete, which necessitates the
 * management of two separate state props:
 *
 * 1. "inputValue": The value of the text input at any given time during focused
 *    input, which is managed here with internal state var `textFieldValue`.
 *
 * 2. "value": The form field's selected value, which is managed here with internal
 *    state var `selectedOption` and Formik ctx hook `setFieldValue`.
 *
 * > The following `@mui/system` props have been added:
 * > - `GridProps`: `gridArea`, `gridColumn`, `gridRow`, etc.
 */
export const AutoComplete = ({
  id,
  label,
  options,
  autoComplete = true,
  autoHighlight = true,
  autoSelect = true,
  blurOnSelect = true,
  includeInputInList = true,
  openOnFocus = true,
  renderInput = (params) => <TextField {...params} label={label} variant="filled" />,
  style,
  ...props
}: AutoCompleteProps) => {
  const [selectedOption, setSelectedOption] = useState<AutoCompleteOption | null>(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const { setFieldValue } = useFormikContext();

  const handleChangeSelectedOption = (
    event: React.SyntheticEvent<Element, Event>,
    selected: unknown
  ) => {
    setSelectedOption(selected as AutoCompleteOption | null);
    setFieldValue(id, (selected as AutoCompleteOption)?.id ?? selected);
  };

  const handleTextInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => setTextFieldValue(newInputValue);

  return (
    <StyledMuiAutoComplete
      id={id}
      options={options}
      // autocomplete behavior props:
      autoComplete={autoComplete}
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      blurOnSelect={blurOnSelect}
      includeInputInList={includeInputInList}
      openOnFocus={openOnFocus}
      // state values and handlers:
      value={selectedOption}
      onChange={handleChangeSelectedOption}
      inputValue={textFieldValue}
      onInputChange={handleTextInputChange}
      // aesthetic props and the rest:
      renderInput={renderInput}
      style={style}
      {...props}
    />
  );
};

const StyledMuiAutoComplete = styled(MuiAutoComplete, {
  shouldForwardProp: (propName) => !(propName as string).startsWith("grid")
})<
  AutocompleteProps<
    AutoCompleteOption, // T
    false, //              Multiple
    false, //              DisableClearable
    false, //              FreeSolo
    "div" //               ChipComponent
  > &
    GridProps
>(muiGridSxProps);

export type AutoCompleteProps = Omit<
  React.ComponentProps<typeof StyledMuiAutoComplete>,
  "label" | "options" | "renderInput"
> & {
  id: string;
  label?: React.ReactNode;
  options: AutoCompleteOptions;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
};

export interface AutoCompleteOption {
  id: string;
  label: string;
  group?: string;
  [K: string]: any;
}

export type AutoCompleteOptions = Array<AutoCompleteOption>;
