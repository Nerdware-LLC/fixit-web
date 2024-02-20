import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { fmt } from "@/utils/formatters";
import type { Invoice } from "@/graphql/types";
import type { Simplify } from "type-fest";

/**
 * A list-item component that can be used to render an Invoice within a list.
 *
 * > _For `AutoComplete` options, use this component in the `renderOption`
 *   function, **not** `InvoiceListItemButton`_.
 */
export const InvoiceListItem = ({
  invoice,
  userToDisplay,
  divider = true,
  ...listItemProps
}: InvoiceListItemProps) => (
  <ListItem divider={divider} {...listItemProps}>
    <InvoiceListItemContent invoice={invoice} userToDisplay={userToDisplay} />
  </ListItem>
);

/**
 * A list-item-_**button**_ component that can be used to render an Invoice within a list.
 *
 * > _**Do not use this component in the `renderOption` function of an `AutoComplete` component.
 *   Instead use {@link InvoiceListItem}.**_
 */
export const InvoiceListItemButton = ({
  invoice,
  userToDisplay,
  divider = true,
  ...listItemButtonProps
}: InvoiceListItemButtonProps) => (
  <ListItemButton divider={divider} {...listItemButtonProps}>
    <InvoiceListItemContent invoice={invoice} userToDisplay={userToDisplay} />
  </ListItemButton>
);

/**
 * Content for the {@link InvoiceListItem} and {@link InvoiceListItemButton} components.
 */
const InvoiceListItemContent = ({ invoice, userToDisplay }: InvoiceListItemContentProps) => {
  // Get profile values from `userToDisplay`
  const { displayName, photoUrl } = userToDisplay.profile;

  // Get other Invoice values
  const { status, amount, createdAt } = invoice;

  // Apply formatting to "prettify" values
  const prettyAmount = fmt.intToCurrencyRoundedStr(amount);
  const prettyCreatedAt = dayjs(createdAt).format("MMM D");
  const prettyStatus = status.replace(/_/g, " ");

  return (
    <>
      <ListItemAvatar>
        <Avatar src={photoUrl || undefined} alt={displayName} />
      </ListItemAvatar>
      <ListItemText
        primary={displayName}
        secondary={prettyAmount}
        secondaryTypographyProps={{ variant: "body2", color: "text.primary", textAlign: "right" }}
      />
      <ListItemText
        primary={prettyCreatedAt}
        primaryTypographyProps={{
          variant: "body2",
          marginBottom: "1.25rem",
        }}
        secondary={prettyStatus}
        secondaryTypographyProps={{ variant: "caption" }}
        style={{
          textAlign: "right",
          marginLeft: "1rem", // ensures `description` isn't too close to `status`
          flexShrink: 0, // ensures the contained text isn't truncated
        }}
      />
    </>
  );
};

export type InvoiceListItemProps = Simplify<
  InvoiceListItemContentProps & Omit<ListItemProps, "children">
>;

export type InvoiceListItemButtonProps = Simplify<
  InvoiceListItemContentProps & Omit<ListItemButtonProps, "children">
>;

type InvoiceListItemContentProps = {
  invoice: Invoice;
  userToDisplay: Invoice["createdBy" | "assignedTo"];
};
