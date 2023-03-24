import { forwardRef, useRef, type ForwardedRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAvatar, { type AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import Text from "@mui/material/Typography";
import type { UserProfile } from "@types";

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
export const Avatar = forwardRef<MaybeAvatarRef, AvatarProps>(function Avatar(
  {
    profile,
    imageSrc,
    showDisplayName = false,
    containerProps = {},
    avatarProps = {},
    ...props
  }: AvatarProps,
  ref: ForwardedRef<MaybeAvatarRef>
) {
  // If parent does not forward a ref, use local fallback
  const localRef = useRef<HTMLDivElement>(null);
  const avatarRef = ref || localRef;

  return (
    <AvatarContainer className="avatar-container" {...containerProps}>
      <MuiAvatar
        ref={avatarRef}
        alt={profile?.displayName}
        src={imageSrc || profile?.photoUrl}
        {...avatarProps}
        {...props}
      >
        {
          // The below char will be unused if an image src is available
          [profile?.displayName, profile?.givenName, profile?.familyName]
            .find((name) => !!name)
            ?.charAt(0)
        }
      </MuiAvatar>
      {showDisplayName && profile?.displayName && (
        <Text className="avatar-display-name">{profile.displayName}</Text>
      )}
    </AvatarContainer>
  );
});

const AvatarContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  "& > .avatar-display-name": {
    maxHeight: "2.5rem", // height of the MuiAvatar
    marginLeft: "0.5rem",
    lineHeight: "1.25rem", // half the height of the avatar, allows for 2 lines
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    pointerEvents: "none"
  }
});

export type AvatarProps = {
  profile?: UserProfile;
  imageSrc?: string;
  showDisplayName?: boolean;
  containerProps?: React.ComponentProps<typeof AvatarContainer>;
  avatarProps?: MuiAvatarProps;
} & MuiAvatarProps;

type MaybeAvatarRef = HTMLDivElement | null;
