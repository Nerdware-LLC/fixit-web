import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Text } from "../Typography";
import type { UserProfile } from "@types";

/**
 * **Avatar** type order of precedence:
 *
 * 1. Image "src" from `imageSrc` or `photoUrl` if available
 * 2. User's initials if `givenName` and `familyName` are available
 * 3. Else use MUI's fallback generic avatar icon
 *
 * If `withDisplayName` is set to `true`, the avatar will be shown
 * with the user's display name shown below the avatar image.
 */
export const Avatar = ({
  imageSrc,
  profile,
  withDisplayName = false,
  styles,
  ...props
}: {
  imageSrc?: string;
  profile?: UserProfile;
  withDisplayName?: boolean;
  styles?: {
    avatar?: React.CSSProperties;
    displayName?: React.CSSProperties;
  };
} & Omit<React.ComponentProps<typeof MuiAvatar>, "style">) => {
  const avatarProps = {
    alt: "User Avatar",
    style: styles?.avatar ?? {},
    ...((!!imageSrc || !!profile?.photoUrl) && { src: imageSrc ?? profile?.photoUrl }),
    ...props
  };

  const AvatarComp =
    !!avatarProps?.src || !(!!profile?.givenName && !!profile?.familyName) ? (
      <StyledMuiAvatar {...avatarProps} />
    ) : (
      <StyledMuiAvatar {...avatarProps}>
        {`${profile.givenName.charAt(0)}${profile.familyName.charAt(0)}`}
      </StyledMuiAvatar>
    );

  return withDisplayName === true ? (
    <>
      {AvatarComp}
      <Text style={{ margin: "0.25rem 0 0 0", ...(styles?.displayName ?? {}) }}>
        {profile?.displayName ?? ""}
      </Text>
    </>
  ) : (
    AvatarComp
  );
};

const StyledMuiAvatar = styled(MuiAvatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  "&:hover": {
    cursor: "pointer"
  }
}));
