import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "./Avatar";
import type { UserProfile } from "@types";

/**
 * Will display an Avatar along with the Contact's `displayName`
 * - onClick event handler will nav to `/home/contacts/:id`
 * - Can set `showDisplayName` = false if displayName is undesirable
 */
export const ContactAvatar = ({
  contact,
  showDisplayName = true,
  ...avatarProps
}: {
  contact: { id: string; handle: string; profile: UserProfile };
  showDisplayName?: boolean;
} & React.ComponentProps<typeof Avatar>) => {
  const nav = useNavigate();

  const navToContactItemView = () => nav(`/home/contacts/${encodeURIComponent(contact?.id)}`);

  const displayName = contact?.profile?.displayName ?? contact.handle;

  return (
    <Tooltip title={`View contact: ${displayName}`}>
      <Avatar
        profile={contact.profile}
        onClick={navToContactItemView}
        showDisplayName={showDisplayName}
        {...avatarProps}
      />
    </Tooltip>
  );
};
