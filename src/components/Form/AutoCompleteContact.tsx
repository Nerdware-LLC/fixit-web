import { useQuery } from "@apollo/client/react/hooks";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { Avatar } from "@components/Avatar";
import { QUERIES } from "@graphql/queries";
import { AutoComplete, type AutoCompleteProps } from "./AutoComplete";
import type { Profile, Contact } from "@graphql/types";

/**
 * AutoCompleteContact
 * - Uses `MyContacts` GQL query with "cache-only" fetch policy
 * - Uses MUI Autocomplete input
 */
export const AutoCompleteContact = ({
  reduceContacts = (contacts) => contacts as Contact[],
  emptySelectionOption,
  ...props
}: AutoCompleteContactProps) => {
  const { data, loading } = useQuery(QUERIES.MY_CONTACTS, {
    fetchPolicy: "cache-only", // For this input, only pull from cache
  });

  const contactOptions: AutoCompleteContactOptions = [];

  if (
    !loading &&
    data?.myContacts &&
    Array.isArray(data.myContacts) &&
    data.myContacts.length > 0
  ) {
    contactOptions.concat(reduceContacts(data.myContacts));
  }

  const renderOptionFallback =
    emptySelectionOption && "label" in emptySelectionOption
      ? `- ${emptySelectionOption.label} -`
      : "--";

  const handleRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    { profile }: AutoCompleteContactOption
  ) => (
    <AutoCompleteContactOptionListItem
      profile={profile as Contact["profile"]} // GqlProfileType allows optional fields to be null, causing type conflicts
      renderFallback={renderOptionFallback}
      style={{ height: profile ? "3.5rem" : "3rem" }}
      {...props}
    />
  );

  const handleGetOptionLabel = ({ profile, handle }: AutoCompleteContactOption) =>
    `${profile?.displayName || handle}`;

  return (
    <AutoComplete
      options={contactOptions}
      renderOption={handleRenderOption}
      getOptionLabel={handleGetOptionLabel}
      {...props}
    />
  );
};

const AutoCompleteContactOptionListItem = ({
  profile,
  renderFallback = "--",
  ...props
}: {
  profile?: Profile;
  renderFallback?: React.ReactNode;
} & React.HTMLAttributes<HTMLLIElement>) => (
  <Box component="li" {...props}>
    {profile ? (
      <Avatar profile={profile} showDisplayName style={{ marginRight: "0.25rem" }} />
    ) : (
      <Text fontWeight="bold">{renderFallback}</Text>
    )}
  </Box>
);

export type AutoCompleteContactProps = {
  reduceContacts?: (contacts: Array<AutoCompleteContactOption>) => AutoCompleteContactOptions;
} & Omit<
  AutoCompleteProps<AutoCompleteContactOption>,
  "options" | "renderOption" | "getOptionLabel"
>;

export type AutoCompleteContactOption = Contact;
export type AutoCompleteContactOptions = Array<AutoCompleteContactOption>;
