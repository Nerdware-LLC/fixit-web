import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import {
  CoreListItemLayout,
  type CoreListItemLayoutProps,
} from "@layouts/CoreItemsListView/CoreListItemLayout";
import { coreListItemLayoutClassNames } from "@layouts/CoreItemsListView/classNames";
import { formatNum } from "@utils/formatNum";
import type { Invoice } from "@graphql/types";

export const InvoicesListItem = ({ listName, item, onClick, ...props }: InvoicesListItemProps) => {
  if (!listName || !item || !onClick) return null;

  const isInboxList = listName === "Inbox";
  const { createdBy, assignedTo, status, amount, createdAt } = item;
  const userToDisplay = isInboxList ? createdBy : assignedTo;

  const prettyContactName = userToDisplay.profile?.displayName
    ? userToDisplay.profile.displayName
    : userToDisplay.handle;

  const prettyAmount = formatNum.toCurrencyRoundedStr(amount);
  const prettyCreatedAt = createdAt.toLocaleDateString("en-us", { day: "numeric", month: "short" });
  const prettyStatus = status.replace(/_/g, " ");

  return (
    <StyledInvoicesListItem
      user={userToDisplay}
      onClick={onClick}
      itemID={item.id}
      listName={listName}
      {...props}
    >
      <div className={invoicesListItemClassNames.middleContentContainer}>
        <Text>{prettyContactName}</Text>
      </div>

      <div className={invoicesListItemClassNames.amountContainer}>
        <Text className={invoicesListItemClassNames.amountText}>{prettyAmount}</Text>
      </div>

      <div className={invoicesListItemClassNames.rightContentContainer}>
        <Text className={coreListItemLayoutClassNames.createdAtText} variant="body2">
          {prettyCreatedAt}
        </Text>
        <Text className={coreListItemLayoutClassNames.statusText} variant="caption" component="p">
          {prettyStatus}
        </Text>
      </div>
    </StyledInvoicesListItem>
  );
};

export const invoicesListItemClassNames = {
  middleContentContainer: "inv-list-item-middle-content-container",
  amountContainer: "inv-list-item-amount-container",
  amountText: "inv-list-item-amount-text",
  rightContentContainer: "inv-list-item-right-content-container",
};

const StyledInvoicesListItem = styled(CoreListItemLayout)(({ theme }) => ({
  // On mobile, shrink the avatar and its container to 2.5rem wide
  [`& .${coreListItemLayoutClassNames.leftContentContainer}`]: {
    ...(theme.variables.isMobilePageLayout && {
      width: "2.5rem !important",
      minWidth: "2.5rem !important",
      maxWidth: "2.5rem !important",
    }),

    [`& .${coreListItemLayoutClassNames.avatar}`]: {
      ...(theme.variables.isMobilePageLayout && {
        height: "2.5rem !important",
        width: "2.5rem !important",
      }),
    },
  },

  // INVOICE LIST ITEM CHILDREN

  [`& .${coreListItemLayoutClassNames.childrenContentContainer}`]: {
    [`& > .${invoicesListItemClassNames.middleContentContainer}`]: {
      maxHeight: "2.5rem", // ensures no 3rd line of text is partially visible
      justifyContent: "center !important",

      "& > .MuiTypography-root": {
        whiteSpace: "normal",
      },
    },

    [`& > .${invoicesListItemClassNames.amountContainer}`]: {
      width: "4rem",
      flexShrink: 0,
      textAlign: "right",
      marginLeft: "auto !important",
      justifyContent: "center !important",
    },

    [`& > .${invoicesListItemClassNames.rightContentContainer}`]: {
      flexShrink: 0,
      ...(theme.variables.isMobilePageLayout
        ? {
            width: "4rem !important",
            minWidth: "4rem !important",
            maxWidth: "4rem !important",
          }
        : {
            width: "4.5rem !important",
            minWidth: "4.5rem !important",
            maxWidth: "4.5rem !important",
          }),
    },
  },
}));

export type InvoicesListItemProps = {
  listName?: "Inbox" | "Sent";
  item?: Invoice;
  onClick?: CoreListItemLayoutProps["onClick"];
};
