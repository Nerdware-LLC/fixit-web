import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import Text from "@mui/material/Typography";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { avatarClassNames } from "./classNames.js";
import type { Profile } from "@/types/graphql.js";
import type { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import type { Simplify, Except } from "type-fest";

/**
 * **Avatar** display is determined by the following order of precedence:
 *
 * 1. `src` prop if provided
 * 2. {@link Profile|`profile.photoUrl`} prop if provided
 * 3. An optional `fallback` prop, which can be any `ReactNode`
 * 4. The first letter of one of the following prop values, in order of precedence:
 *    1. `alt`
 *    2. `avatarProps.alt`
 *    3. `profile.displayName`
 *    4. `profile.businessName`
 *    5. `profile.givenName`
 * 5. The final fallback is MUI's generic avatar icon
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    src,
    profile,
    fallback,
    showDisplayName = false,
    containerProps = {},
    avatarProps = {},
    alt: explicitAltProp,
    ...muiAvatarProps
  },
  fwdRef
) {
  const avatarRef = useMaybeRef(fwdRef);

  // Mui's Avatar will fallback to the first letter of the `alt` prop if `src`
  // is unavailable and `fallback` is null/undefined.
  const alt =
    explicitAltProp ||
    avatarProps.alt ||
    profile?.displayName ||
    profile?.businessName ||
    profile?.givenName ||
    undefined;

  return (
    <StyledDiv className={avatarClassNames.root} {...containerProps}>
      <MuiAvatar
        ref={avatarRef}
        alt={alt}
        src={src || profile?.photoUrl || undefined}
        {...avatarProps}
        {...muiAvatarProps}
      >
        {fallback}
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

export type AvatarProps = Simplify<
  {
    profile?: Profile;
    fallback?: React.ReactNode;
    showDisplayName?: boolean;
    containerProps?: Except<
      React.ComponentPropsWithoutRef<typeof StyledDiv>,
      "children" | "className"
    >;
    avatarProps?: Except<MuiAvatarProps, "children" | "ref">;
  } & Except<MuiAvatarProps, "children">
>;
