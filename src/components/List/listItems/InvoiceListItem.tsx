import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { intToCurrencyStr } from "@/utils/formatters/currency.js";
import { listItemClassNames } from "./classNames.js";
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
  <StyledListItemButton divider={divider} {...listItemButtonProps}>
    <InvoiceListItemContent invoice={invoice} userToDisplay={userToDisplay} />
  </StyledListItemButton>
);

const StyledListItemButton = styled(ListItemButton)(({ theme: { variables } }) => ({
  [`& .${listItemClassNames.invoiceListItemDisplayName}`]: {
    whiteSpace: "normal",
    fontSize: variables.isMobilePageLayout ? "1rem" : "1.1rem",
  },
  [`& .${listItemClassNames.invoiceListItemAmount}`]: {
    fontSize: variables.isMobilePageLayout ? "1.1rem" : "1.35rem",
  },
  [`& > .${listItemClassNames.invoiceListItemRightText}`]: {
    textAlign: "right",
    width: "20%",
    maxWidth: "7rem",
    flexShrink: 0,
    flexGrow: 0,
  },
}));

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
        primaryTypographyProps={{ className: listItemClassNames.invoiceListItemDisplayName }}
      />
      <ListItemText
        primary={prettyAmount}
        primaryTypographyProps={{ className: listItemClassNames.invoiceListItemAmount }}
        className={listItemClassNames.invoiceListItemRightText}
        style={{ minWidth: "4rem" }}
      />
      <ListItemText
        primary={prettyCreatedAt}
        primaryTypographyProps={{ variant: "body2", marginBottom: "1.25rem" }}
        secondary={prettyStatus}
        secondaryTypographyProps={{ variant: "caption" }}
        className={listItemClassNames.invoiceListItemRightText}
        style={{ minWidth: "4.75rem" }}
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
