import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@/graphql/queries.js";
import { Avatar, type AvatarProps } from "./Avatar.jsx";

/**
 * `AvatarMyProfile` is simply a wrapper around `Avatar` that uses the
 * {@link QUERIES.MY_PROFILE|`myProfile` GQL query} to populate the `profile` prop.
 */
export const AvatarMyProfile = (props: AvatarMyProfileProps) => {
  const { data } = useQuery(QUERIES.MY_PROFILE);

  return <Avatar profile={data?.myProfile} {...props} />;
};

export type AvatarMyProfileProps = Omit<AvatarProps, "profile">;
