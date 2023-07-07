import { AutoComplete, type AutoCompleteProps, type AutoCompleteOption } from "./AutoComplete";

export const AutoCompleteStates = (props: AutoCompleteStatesProps) => (
  <AutoComplete
    options={US_STATES_AND_TERRITORIES}
    groupBy={(option) => option.group}
    autoSelect
    {...props}
  />
);

export type AutoCompleteStatesProps = Omit<
  AutoCompleteProps<AutoCompleteOption & { group: string }>,
  "options" | "groupBy" | "autoSelect"
>;

const US_STATES_AND_TERRITORIES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]
  .map((placeName) => ({ id: placeName, label: placeName, group: "States" }))
  .concat(
    ["American Samoa", "Guam", "Northern Mariana Islands", "Puerto Rico", "US Virgin Islands"].map(
      (placeName) => ({ id: placeName, label: placeName, group: "Territories" })
    )
  );
