import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { listItemTextClasses } from "@mui/material/ListItemText";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { intToCurrencyStr } from "@/utils/formatters/currency.js";
import type { Invoice } from "@/types/graphql.js";
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
  const prettyAmount = intToCurrencyStr(amount, { shouldRound: true });
  const prettyCreatedAt = dayjs(createdAt).format("MMM D");
  const prettyStatus = status.replace(/_/g, " ");

  return (
    <>
      <ListItemAvatar>
        <Avatar src={photoUrl || undefined} alt={displayName}>
          {displayName.charAt(0) || <PersonOffIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={displayName}
        sx={{
          maxHeight: { xs: "3rem", lg: "3.25rem" },
          overflow: "hidden",

          [`& > .${listItemTextClasses.primary}`]: {
            fontSize: { xs: "1rem", lg: "1.1rem" },
            whiteSpace: "normal !important",
          },
        }}
      />
      <ListItemText
        primary={prettyAmount}
        sx={{
          [`&.${listItemTextClasses.root}, & + .${listItemTextClasses.root}`]: {
            minWidth: "4.5rem",
            textAlign: "right",
            width: "20%",
            maxWidth: "7rem",
            flexGrow: 0,
            flexShrink: 0,
          },
          [`& > .${listItemTextClasses.primary}`]: {
            fontSize: { xs: "1.1rem", lg: "1.35rem" },
          },
        }}
      />
      <ListItemText
        primary={prettyCreatedAt}
        primaryTypographyProps={{ variant: "body2" }}
        secondary={prettyStatus}
        secondaryTypographyProps={{ variant: "caption" }}
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
