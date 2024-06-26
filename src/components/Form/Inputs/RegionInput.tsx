import { useField } from "formik";
import { AutoCompleteStates } from "./AutoCompleteStates.jsx";
import { TextInput } from "./TextInput.jsx";

/**
 * This Formik-integrated input is used to gather a location's _region_.
 * The rendered component depends on the location's _country_ value:
 *
 * - When a location's _country_ value is `"USA"`, an {@link AutoCompleteStates}
 *   component which includes a comprehensive list of US states and territories.
 *
 * - For any other _country_, this component renders a {@link TextInput} component
 *   to provide the user with the flexibility to input any value.
 *
 * @param countryFieldID The Formik field ID for the _country_ value, e.g. `'location["country"]'`.
 */
export const RegionInput = ({ countryFieldID, regionFieldID }: RegionInputProps) => {
  const [{ value: countryValue }] = useField<string | null | undefined>(countryFieldID);

  return countryValue === "USA" || !countryValue ? (
    <AutoCompleteStates id={regionFieldID} label="State" />
  ) : (
    <TextInput id={regionFieldID} label="Region" />
  );
};

export type RegionInputProps = {
  countryFieldID: string;
  regionFieldID: string;
};
