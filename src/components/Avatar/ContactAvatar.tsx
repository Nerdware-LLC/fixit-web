import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, type AvatarProps } from "./Avatar";
import type { UserProfile } from "@types";

/**
 * Will display an Avatar along with the Contact's `displayName`
 * - If `viewContactOnClick` is not explicitly set to false, onClick event
 *   handler will nav to `/home/contacts/:id`
 *   > Typically, `viewContactOnClick` will be
 *   > - `TRUE  if contact={item.assignedTo}`
 *   > - `FALSE if contact={item.createdBy}`
 * - Can set `showDisplayName` = false if displayName is undesirable.
 */
export const ContactAvatar = ({
  contact,
  viewContactOnClick = true,
  showDisplayName = true,
  ...avatarProps
}: {
  contact: { id: string; handle: string; profile: UserProfile };
  viewContactOnClick?: boolean;
  showDisplayName?: boolean;
} & AvatarProps) => {
  const nav = useNavigate();

  const commonAvatarProps = {
    profile: contact.profile,
    showDisplayName,
    ...avatarProps
  };

  return (
    <>
      {viewContactOnClick ? (
        <Tooltip title={`View contact: ${contact.profile?.displayName ?? contact.handle}`}>
          <Avatar
            onClick={() => nav(`/home/contacts/${encodeURIComponent(contact.id)}`)}
            {...commonAvatarProps}
          />
        </Tooltip>
      ) : (
        <Avatar {...commonAvatarProps} />
      )}
    </>
  );
};
