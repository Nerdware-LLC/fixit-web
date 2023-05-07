import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql/queries";
import { Avatar, type AvatarProps } from "./Avatar";

/**
 * **UserAvatar** automatically fetches the user's `profile` which
 * it passes into the `Avatar` component. The user's `displayName`
 * can optionally be displayed underneath the avatar image.
 *
 * If the query has already been performed by a parent component, use
 * `Avatar` instead so the cache isn't burdened by duplicate queries.
 */
export const UserAvatar = (props: AvatarProps) => {
  const { data } = useQuery(QUERIES.MY_PROFILE);

  return <Avatar profile={data?.myProfile} {...props} />;
};
