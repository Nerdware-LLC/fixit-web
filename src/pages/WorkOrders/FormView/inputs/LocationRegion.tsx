import { useField } from "formik";
import { AutoCompleteStates } from "@components/Form/AutoCompleteStates";
import { TextInput } from "@components/Form/TextInput";

/**
 * If WorkOrder-Form value 'location["region"]' is "USA", render an Autocomplete
 * which includes US states and territories, else render a TextInput for misc input.
 */
export const LocationRegion = ({ id }: { id: string }) => {
  const [{ value: country }] = useField('location["country"]');

  return typeof country === "string" && country.length > 0 && country !== "USA" ? (
    <TextInput id={id} label="Region" />
  ) : (
    <AutoCompleteStates id={id} label="State" />
  );
};
