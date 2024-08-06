import { isString } from "@nerdware/ts-type-safety-utils";
import { ContactListItem } from "@/components/List/listItems/ContactListItem.jsx";
import { AutoComplete, type AutoCompleteProps } from "./AutoComplete.jsx";
import type { Contact } from "@/types/graphql.js";

export type AutoCompleteContactProps = AutoCompleteProps<AutoCompleteContactOption>;
export type AutoCompleteContactOption = Contact;
export type AutoCompleteContactOptions = Array<AutoCompleteContactOption>;

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
      getFieldValueFromOption={getFieldValueFromOption}
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
  option: Contact | string | null // Depending on the field's nullability, this may be an empty string
) => {
  return (option as Contact | null)?.id ? (option as Contact).id.replace(/^CONTACT#/, "") : null;
};

/**
 * Default `renderOption` fn for {@link AutoCompleteContact}.
 */
const defaultRenderOption: AutoCompleteContactProps["renderOption"] = (
  { key, ...listItemProps },
  contact // option
  // other available props: state, ownerState
) => <ContactListItem key={key} contact={contact} {...listItemProps} />;

/**
 * Default `getOptionLabel` fn for {@link AutoCompleteContact}.
 */
const defaultGetOptionLabel: AutoCompleteContactProps["getOptionLabel"] = (opt) => {
  return isString(opt.handle) ? opt.handle : isString(opt) ? opt : "";
};
