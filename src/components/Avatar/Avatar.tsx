import { forwardRef, useRef, type ForwardedRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
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
  }: {
    profile?: UserProfile;
    imageSrc?: string;
    showDisplayName?: boolean;
    containerProps?: Omit<React.ComponentProps<typeof AvatarContainer>, "style">;
    avatarProps?: React.ComponentProps<typeof MuiAvatar>;
  } & React.ComponentProps<typeof MuiAvatar>,
  ref: ForwardedRef<MaybeAvatarRef>
) {
  // If parent does not forward a ref, use local fallback
  const localRef = useRef<HTMLDivElement>(null);
  const avatarRef = ref || localRef;

  return (
    <AvatarContainer className="avatar-container" {...containerProps}>
      <MuiAvatar
        ref={avatarRef}
        alt={profile?.displayName ?? "User Avatar"}
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

const AvatarContainer = styled("div")(({ theme: { palette }, onClick }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "& > div.MuiAvatar-root": {
    background: `-webkit-linear-gradient(135deg, ${palette.primary.dark} 30%, ${palette.primary.light})`,
    "&:hover": {
      cursor: onClick ? "pointer" : "auto"
    }
  },
  "& > .MuiTypography-root": {
    pointerEvents: "none",
    marginLeft: "0.5rem"
  }
}));

type AvatarProps = {
  profile?: UserProfile;
  imageSrc?: string;
  showDisplayName?: boolean;
  containerProps?: React.ComponentProps<typeof AvatarContainer>;
  avatarProps?: React.ComponentProps<typeof MuiAvatar>;
} & React.ComponentProps<typeof MuiAvatar>;

type MaybeAvatarRef = HTMLDivElement | null;
