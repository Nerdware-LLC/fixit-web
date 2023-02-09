import { useQuery } from "@apollo/client/react/hooks";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { Autocomplete, Avatar, type AutocompleteOption } from "@components";
import { QUERIES } from "@graphql/queries";
import type { Contact } from "@types";
import { MOCK_CONTACTS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

/**
 * AutocompleteContact
 * - Uses `MyContacts` GQL query with "cache-only" fetch policy
 * - Uses MUI Autocomplete input
 */
export const AutocompleteContact = ({
  label,
  emptySelectionOption = { id: "", label: "Unassigned" },
  ...props
}: { emptySelectionOption?: AutocompleteOption } & Omit<
  React.ComponentProps<typeof Autocomplete>,
  "options"
>) => {
  const { data, loading } = useQuery(QUERIES.MY_CONTACTS, {
    fetchPolicy: "cache-only",
    skip: true // FIXME
  });

  const contactOptions: AutocompleteContactOptions = [
    emptySelectionOption,
    // FIXME rm below
    ...Object.values(MOCK_CONTACTS).map((contact) => ({
      ...contact,
      label: contact.profile?.displayName || contact.handle
    }))
  ];

  if (!loading && data && Array.isArray(data?.myContacts) && data.myContacts.length > 0) {
    contactOptions.concat(
      data.myContacts.reduce((accum: AutocompleteContactOptions, contact: Contact) => {
        return [...accum, { ...contact, label: contact.profile?.displayName || contact.handle }];
      }, [])
    );
  }

  return (
    <Autocomplete
      options={contactOptions}
      label={label}
      renderOption={(props, option) => {
        const { profile = null } = option as AutocompleteContactOption;

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

type AutocompleteContactOption = AutocompleteOption & Partial<Contact>;
type AutocompleteContactOptions = Array<AutocompleteContactOption>;
