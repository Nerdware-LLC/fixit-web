import { useNavigate } from "react-router-dom";
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import { getItemViewPath } from "@/routes/helpers";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore";
import { Avatar, type AvatarProps } from "./Avatar";
import type { Contact } from "@/graphql/types";
import type { Simplify } from "type-fest";

/**
 * Will display an Avatar along with the Contact's `displayName`
 * - If `viewContactOnClick` is not explicitly set to false, onClick event handler will
 *   nav to `/home/contacts/:id` if `contact.id` is not the authenticated User's ID.
 *
 *   > If set explicitly, typically `viewContactOnClick` will be
 *   > - `TRUE  if contact={item.assignedTo}`
 *   > - `FALSE if contact={item.createdBy}`
 * - Can set `showDisplayName` = false if displayName is undesirable.
 */
export const ContactAvatar = ({
  contact,
  viewContactOnClick,
  showDisplayName = true,
  tooltipProps = {},
  ...avatarProps
}: ContactAvatarProps) => {
  const nav = useNavigate();
  const authenticatedUser = authenticatedUserStore.useSubToStore();

  // If viewContactOnClick is undefined, set a default:
  viewContactOnClick ??= contact.id !== authenticatedUser?.id;

  const commonAvatarProps = {
    profile: contact.profile,
    showDisplayName,
    ...avatarProps,
  };

  const handleClick = () => nav(getItemViewPath("contacts", contact.id));

  return (
    <>
      {viewContactOnClick ? (
        <Tooltip
          title={`View contact: ${contact.profile.displayName}`}
          role="button"
          {...tooltipProps}
        >
          <Avatar onClick={handleClick} {...commonAvatarProps} />
        </Tooltip>
      ) : (
        <Avatar {...commonAvatarProps} />
      )}
    </>
  );
};

export type ContactAvatarProps = Simplify<
  {
    contact: Pick<Contact, "id" | "profile" | "handle">;
    viewContactOnClick?: boolean;
    showDisplayName?: boolean;
    tooltipProps?: Simplify<Omit<TooltipProps, "children" | "title" | "role">>;
  } & AvatarProps
>;
