import { isString } from "@nerdware/ts-type-safety-utils";
import { ContactListItem } from "@/components/List/listItems/ContactListItem.jsx";
import { AutoComplete, type AutoCompleteProps } from "./AutoComplete.jsx";
import type { Contact } from "@/types/graphql.js";

/**
 * `AutoCompleteContact` is a Mui Autocomplete input used to select a Contact
 * from the provided list of Contact `options`.
 */
export const AutoCompleteContact = ({
  getFieldValueFromOption,
  renderOption,
  getOptionLabel,
  ...autoCompleteProps
}: AutoCompleteContactProps) => {
  // Assign default fns:
  getFieldValueFromOption ??= defaultGetFieldValueFromOption;
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
 * Default `getFieldValueFromOption` fn for {@link AutoCompleteContact}.
 */
const defaultGetFieldValueFromOption: AutoCompleteContactProps["getFieldValueFromOption"] = (
  option
) => option?.id.replace(/^CONTACT#/, "") ?? "";

/**
 * Default `renderOption` fn for {@link AutoCompleteContact}.
 */
const defaultRenderOption: AutoCompleteContactProps["renderOption"] = (
  listItemProps,
  contact // option
  // other available props: state, ownerState
) => <ContactListItem contact={contact} {...listItemProps} />;

/**
 * Default `getOptionLabel` fn for {@link AutoCompleteContact}.
 */
const defaultGetOptionLabel: AutoCompleteContactProps["getOptionLabel"] = (opt) => {
  return isString(opt.handle) ? opt.handle : isString(opt) ? opt : "";
};

export type AutoCompleteContactProps = AutoCompleteProps<AutoCompleteContactOption>;
export type AutoCompleteContactOption = Contact;
export type AutoCompleteContactOptions = Array<AutoCompleteContactOption>;
