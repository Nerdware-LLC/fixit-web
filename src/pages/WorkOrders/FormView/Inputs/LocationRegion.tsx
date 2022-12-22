import { useField } from "formik";
import { TextInput, AutocompleteStates } from "@components";

/**
 * If WorkOrder-Form value 'location["region"]' is "USA", render an Autocomplete
 * which includes US states and territories, else render a TextInput for misc input.
 */
export const LocationRegion = ({ id }: { id: string }) => {
  const [countryField] = useField('location["country"]');

  return countryField.value === "USA" ? (
    <AutocompleteStates id={id} label="State" style={{ marginBottom: "1.45rem" }} />
  ) : (
    <TextInput id={id} label="Region" />
  );
};
