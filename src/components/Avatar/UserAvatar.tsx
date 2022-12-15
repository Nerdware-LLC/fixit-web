import { useQuery } from "@apollo/client/react/hooks";
import { Avatar } from "./Avatar";
import { QUERIES } from "@graphql";

/**
 * **UserAvatar** automatically fetches the user's `profile` which
 * it passes into the `Avatar` component. The user's `displayName`
 * can optionally be displayed underneath the avatar image.
 *
 * If the query has already been performed by a parent component, use
 * `Avatar` instead so the cache isn't burdened by duplicate queries.
 */
export const UserAvatar = ({ ...avatarProps }: React.ComponentProps<typeof Avatar>) => {
  const { data } = useQuery(QUERIES.MY_PROFILE);

  return <Avatar profile={data?.myProfile} {...avatarProps} />;
};
