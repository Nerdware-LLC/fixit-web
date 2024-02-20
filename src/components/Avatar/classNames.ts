import { avatarClasses as muiAvatarClasses } from "@mui/material/Avatar";

/**
 * Class names for `Avatar` components (src/components/Avatar/).
 *
 * This object includes {@link muiAvatarClasses|avatarClasses} exported from
 * MUI's `Avatar` component under the key `muiAvatar`.
 */
export const avatarClassNames = {
  root: "avatar-root",
  displayName: "avatar-display-name",
  muiAvatar: { ...muiAvatarClasses },
} as const;
