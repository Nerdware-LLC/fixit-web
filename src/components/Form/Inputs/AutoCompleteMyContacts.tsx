import { useMemo } from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@/graphql/queries.js";
import {
  AutoCompleteContact,
  type AutoCompleteContactProps,
  type AutoCompleteContactOptions,
} from "./AutoCompleteContact.jsx";
import type { Simplify } from "type-fest";

/**
 * `AutoCompleteMyContacts` displays the results of the `MyContacts` GQL query
 * (with `fetchPolicy: "cache-only"`), in an `AutoCompleteContact` component.
 */
export const AutoCompleteMyContacts = ({
  reduceContacts = defaultReduceContacts,
  ...autoCompleteContactProps
}: AutoCompleteMyContactsProps) => {
  const { data, loading } = useQuery(QUERIES.MY_CONTACTS, {
    fetchPolicy: "cache-only", // For this input, only pull from cache
  });

  const contactOptions: AutoCompleteContactOptions = useMemo(() => {
    return !loading && Array.isArray(data?.myContacts) && data.myContacts.length > 0
      ? reduceContacts(data.myContacts)
      : [];
  }, [data, loading, reduceContacts]);

  return <AutoCompleteContact options={contactOptions} {...autoCompleteContactProps} />;
};

/**
 * Default `reduceContacts` fn for {@link AutoCompleteContact}.
 */
const defaultReduceContacts = (contacts: AutoCompleteContactOptions) => contacts;

export type AutoCompleteMyContactsProps = Simplify<
  {
    reduceContacts?: (contacts: AutoCompleteContactOptions) => AutoCompleteContactOptions;
  } & Omit<AutoCompleteContactProps, "options">
>;
