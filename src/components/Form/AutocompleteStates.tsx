import { Autocomplete, type AutocompleteOption } from "./Autocomplete";

export const AutocompleteStates = ({
  id,
  ...props
}: Omit<React.ComponentProps<typeof Autocomplete>, "options"> & {
  id: string;
}) => (
  <Autocomplete
    id={id}
    options={US_STATES_AND_TERRITORIES}
    groupBy={(option) => (option as AutocompleteOption).group as string}
    {...props}
  />
);

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
  "Wyoming"
]
  .map((placeName) => ({ id: placeName, label: placeName, group: "States" }))
  .concat(
    ["American Samoa", "Guam", "Northern Mariana Islands", "Puerto Rico", "US Virgin Islands"].map(
      (placeName) => ({ id: placeName, label: placeName, group: "Territories" })
    )
  );
