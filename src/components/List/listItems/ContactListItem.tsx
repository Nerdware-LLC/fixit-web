import Avatar from "@mui/material/Avatar";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { Contact } from "@/types/graphql.js";
import type { Simplify } from "type-fest";

/**
 * A list-item component that can be used to render an Contact within a list.
 *
 * > _For `AutoComplete` options, use this component in the `renderOption`
 *   function, **not** `ContactListItemButton`_.
 */
export const ContactListItem = ({
  contact,
  divider = true,
  ...listItemProps
}: ContactListItemProps) => (
  <ListItem divider={divider} {...listItemProps}>
    <ContactListItemContent contact={contact} />
  </ListItem>
);

/**
 * A list-item-_**button**_ component that can be used to render an Contact within a list.
 *
 * > _**Do not use this component in the `renderOption` function of an `AutoComplete` component.
 *   Instead use {@link ContactListItem}.**_
 */
export const ContactListItemButton = ({
  contact,
  divider = true,
  ...listItemButtonProps
}: ContactListItemButtonProps) => (
  <ListItemButton divider={divider} {...listItemButtonProps}>
    <ContactListItemContent contact={contact} />
  </ListItemButton>
);

/**
 * Content for the {@link ContactListItem} and {@link ContactListItemButton} components.
 */
const ContactListItemContent = ({
  contact: {
    handle,
    profile: { displayName, photoUrl },
  },
}: ContactListItemContentProps) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar src={photoUrl || undefined} alt={displayName} />
      </ListItemAvatar>
      <ListItemText primary={handle} secondary={displayName} />
    </>
  );
};

export type ContactListItemProps = Simplify<
  ContactListItemContentProps & Omit<ListItemProps, "children">
>;

export type ContactListItemButtonProps = Simplify<
  ContactListItemContentProps & Omit<ListItemButtonProps, "children">
>;

type ContactListItemContentProps = {
  contact: Contact;
};
