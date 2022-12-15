import { useState } from "react";
import MuiAutocomplete, { type AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

/**
 * This component is a controlled MUI Autocomplete, which necessitates the
 * management of two separate state props:
 *
 * 1. "inputValue": The value of the text input at any given time during focused
 *    input, which is managed here with internal state var `textFieldValue`.
 *
 * 2. "value": The form field's selected value, which is managed here with internal
 *    state var `selectedOption` and Formik ctx hook `setFieldValue`.
 */
export const Autocomplete = ({
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
}: Omit<React.ComponentProps<typeof MuiAutocomplete>, "label" | "options" | "renderInput"> & {
  id: string;
  label?: React.ReactNode;
  options: Array<AutocompleteOption>;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}) => {
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption | null>(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const { setFieldValue } = useFormikContext();

  return (
    <MuiAutocomplete
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
      onChange={(event: React.SyntheticEvent<Element, Event>, selected: unknown) => {
        const selectedOpt = selected as AutocompleteOption | null;
        setSelectedOption(selectedOpt);
        setFieldValue(id, selectedOpt?.id ?? selectedOpt);
      }}
      inputValue={textFieldValue}
      onInputChange={(event, newInputValue) => setTextFieldValue(newInputValue)}
      // aesthetic props and the rest:
      renderInput={renderInput}
      style={style}
      {...props}
    />
  );
};

export interface AutocompleteOption {
  id: string;
  label: string;
  group?: string;
}
