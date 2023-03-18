import { useQuery } from "@apollo/client/react/hooks";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { AutoComplete, Avatar } from "@components";
import { QUERIES } from "@graphql/queries";
import type { AutoCompleteProps, AutoCompleteOption } from "./AutoComplete";
import type { Contact } from "@types";
import { MOCK_CONTACTS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

/**
 * AutoCompleteContact
 * - Uses `MyContacts` GQL query with "cache-only" fetch policy
 * - Uses MUI Autocomplete input
 */
export const AutoCompleteContact = ({
  label,
  emptySelectionOption = { id: "", label: "Unassigned" },
  ...props
}: AutoCompleteContactProps) => {
  const { data, loading } = useQuery(QUERIES.MY_CONTACTS, {
    fetchPolicy: "cache-only",
    skip: true // FIXME
  });

  const contactOptions: AutoCompleteContactOptions = [
    emptySelectionOption,
    // FIXME rm below
    ...Object.values(MOCK_CONTACTS).map((contact) => ({
      ...contact,
      label: contact.profile?.displayName || contact.handle
    }))
  ];

  if (!loading && data && Array.isArray(data?.myContacts) && data.myContacts.length > 0) {
    contactOptions.concat(
      data.myContacts.reduce((accum: AutoCompleteContactOptions, contact: Contact) => {
        return [...accum, { ...contact, label: contact.profile?.displayName || contact.handle }];
      }, [])
    );
  }

  return (
    <AutoComplete
      options={contactOptions}
      label={label}
      renderOption={(props, option) => {
        const { profile = null } = option as AutoCompleteContactOption;

        return (
          <Box component="li" style={{ height: profile ? "3.5rem" : "3rem" }} {...props}>
            {profile ? (
              <Avatar profile={profile} showDisplayName={true} style={{ marginRight: "1rem" }} />
            ) : (
              <Text fontWeight="bold">- {emptySelectionOption.label} -</Text>
            )}
          </Box>
        );
      }}
      {...props}
    />
  );
};

export type AutoCompleteContactProps = { emptySelectionOption?: AutoCompleteOption } & Omit<
  AutoCompleteProps,
  "options"
>;

export type AutoCompleteContactOption = AutoCompleteOption & Partial<Contact>;
export type AutoCompleteContactOptions = Array<AutoCompleteContactOption>;
