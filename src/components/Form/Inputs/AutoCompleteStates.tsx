import { AutoComplete, type AutoCompleteProps, type BaseAutoCompleteOption } from "./AutoComplete";
import type { OverrideProperties } from "type-fest";

export const AutoCompleteStates = ({ ...autoCompleteProps }: AutoCompleteStatesProps) => (
  <AutoComplete
    options={US_STATES_AND_TERRITORIES_OPTIONS}
    groupBy={defaultGroupBy}
    autoSelect
    {...autoCompleteProps}
  />
);

/**
 * Default `groupBy` fn for {@link AutoCompleteStates}.
 */
const defaultGroupBy = (option: AutoCompleteStatesOption) => option.group;

export type AutoCompleteStatesProps = Omit<
  AutoCompleteProps<AutoCompleteStatesOption>,
  "options" | "groupBy" | "autoSelect"
>;

export type AutoCompleteStatesOption = OverrideProperties<
  Required<BaseAutoCompleteOption>,
  { group: "States" | "Territories" }
>;

// prettier-ignore
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
] as const;

// prettier-ignore
const US_TERRITORIES = [
  "American Samoa", "Guam", "Northern Mariana Islands", "Puerto Rico", "US Virgin Islands",
] as const;

const US_STATES_AND_TERRITORIES_OPTIONS: Array<AutoCompleteStatesOption> = [
  ...US_STATES.map<AutoCompleteStatesOption>((stateName) => ({
    id: stateName,
    label: stateName,
    group: "States",
  })),
  ...US_TERRITORIES.map<AutoCompleteStatesOption>((territoryName) => ({
    id: territoryName,
    label: territoryName,
    group: "Territories",
  })),
];
