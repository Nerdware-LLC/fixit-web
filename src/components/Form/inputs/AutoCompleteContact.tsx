import { ContactListItem } from "@/components/List/listItems/ContactListItem";
import { AutoComplete, type AutoCompleteProps } from "./AutoComplete";
import type { Contact } from "@/graphql/types";

/**
 * `AutoCompleteContact` is a Mui Autocomplete input used to select a Contact
 * from the provided list of Contact `options`.
 */
export const AutoCompleteContact = ({
  renderOption,
  getOptionLabel,
  ...autoCompleteProps
}: AutoCompleteContactProps) => {
  // Assign default fns:
  renderOption ??= defaultRenderOption;
  getOptionLabel ??= defaultGetOptionLabel;

  return (
    <AutoComplete
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      {...autoCompleteProps}
    />
  );
};

/**
 * Default `renderOption` fn for {@link AutoCompleteContact}.
 */
const defaultRenderOption: NonNullable<
  AutoCompleteProps<AutoCompleteContactOption>["renderOption"]
> = (
  listItemProps,
  contact // option
  // other available props: state, ownerState
) => <ContactListItem contact={contact} {...listItemProps} />;

/**
 * Default `getOptionLabel` fn for {@link AutoCompleteContact}.
 */
const defaultGetOptionLabel: NonNullable<
  AutoCompleteProps<AutoCompleteContactOption>["getOptionLabel"]
> = ({ handle }) => handle;

export type AutoCompleteContactProps = AutoCompleteProps<AutoCompleteContactOption>;
export type AutoCompleteContactOption = Contact;
export type AutoCompleteContactOptions = Array<AutoCompleteContactOption>;
