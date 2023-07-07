import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import Text from "@mui/material/Typography";
import { useMaybeRef, type MaybeRef } from "@hooks/useMaybeRef";
import { avatarClassNames } from "./classNames";
import type { Profile } from "@graphql/types";
import type { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

/**
 * **Avatar** display is determined by the following order of precedence:
 *
 * 1. Image "src" from `imageSrc` or `photoUrl` if available
 * 2. The first char of one of the following User Profile properties:
 *    1. `displayName`
 *    2. `givenName`
 *    3. `familyName`
 * 3. The final fallback is MUI's generic avatar icon
 */
export const Avatar = forwardRef<MaybeRef<HTMLDivElement>, AvatarProps>(function Avatar(
  { profile, imageSrc, showDisplayName = false, containerProps = {}, avatarProps = {}, ...props },
  fwdRef
) {
  const avatarRef = useMaybeRef(fwdRef);

  return (
    <StyledDiv className={avatarClassNames.root} {...containerProps}>
      <MuiAvatar
        ref={avatarRef}
        alt={profile?.displayName}
        src={imageSrc || profile?.photoUrl || undefined}
        {...avatarProps}
        {...props}
      >
        {
          // The below char will be unused if an image src is available
          [profile?.businessName, profile?.givenName, profile?.familyName]
            .find((name) => !!name)
            ?.charAt(0)
        }
      </MuiAvatar>
      {showDisplayName && profile?.displayName && (
        <Text className={avatarClassNames.displayName}>{profile.displayName}</Text>
      )}
    </StyledDiv>
  );
});

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  [`& > .${avatarClassNames.displayName}`]: {
    maxHeight: "2.5rem", // height of the MuiAvatar
    marginLeft: "0.5rem",
    lineHeight: "1.25rem", // half the height of the avatar, allows for 2 lines
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    pointerEvents: "none",
  },
});

export type AvatarProps = {
  profile?: Profile;
  imageSrc?: string;
  showDisplayName?: boolean;
  containerProps?: React.ComponentProps<typeof StyledDiv>;
  avatarProps?: MuiAvatarProps;
} & MuiAvatarProps;
