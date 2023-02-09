import { useQuery } from "@apollo/client/react/hooks";
import { Loading, Error } from "@components";
import { ProfileViewLayout } from "@layouts";
import { QUERIES } from "@graphql";
import { MOCK_USERS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

/* TODO Add to ProfilePage:

  - Button/form to update DisplayName
  - Button/form to update profile pic
*/

export const ProfilePage = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_PROFILE, {
    notifyOnNetworkStatusChange: true
  });

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  // const { profile } = MOCK_USERS.Guy_McPerson; // FIXME data.myProfile
  // const { displayName, givenName, familyName, businessName } = profile;

  return <ProfileViewLayout headerLabel="Profile" {...MOCK_USERS.Guy_McPerson} />;
};
