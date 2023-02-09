// import { useQuery } from "@apollo/client/react/hooks";
// import { QUERIES } from "@graphql";
import { Avatar } from "./Avatar";
import { MOCK_USERS } from "@/__tests__/mockItems"; // FIXME rm this import of mock data

/**
 * **UserAvatar** automatically fetches the user's `profile` which
 * it passes into the `Avatar` component. The user's `displayName`
 * can optionally be displayed underneath the avatar image.
 *
 * If the query has already been performed by a parent component, use
 * `Avatar` instead so the cache isn't burdened by duplicate queries.
 */
export const UserAvatar = (props: React.ComponentProps<typeof Avatar>) => {
  // const { data } = useQuery(QUERIES.MY_PROFILE);

  return (
    <Avatar
      profile={MOCK_USERS?.Guy_McPerson?.profile} // FIXME data?.myProfile
      {...props}
    />
  );
};
