import { styled } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import Text from "@mui/material/Typography";
import { CoreListItemLayout } from "@layouts";
import { Link } from "@components";
import { formatNum } from "@utils";
import type { Invoice } from "@types";

export const InvoicesListItem = ({
  listName,
  item,
  onClick,
  ...props
}: {
  listName?: "Inbox" | "Sent";
  item?: Invoice;
  onClick?: React.ComponentProps<typeof CoreListItemLayout>["onClick"];
}) => {
  if (!listName || !item || !onClick) return null;

  const isInboxList = listName === "Inbox";
  const { createdBy, assignedTo, status, amount, workOrder, createdAt } = item;
  const userToDisplay = isInboxList ? createdBy : assignedTo;
  const prettyCreatedAt = createdAt.toLocaleDateString("en-us", { day: "numeric", month: "short" });

  const handleClickDiv = (event: React.MouseEvent<HTMLDivElement & HTMLLIElement>) => {
    onClick(event);
  };

  const handleClickWorkOrderLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <CoreListItemLayout
      user={userToDisplay}
      onClick={handleClickDiv}
      itemID={item.id}
      listName={listName}
      {...props}
    >
      <ListItemText
        style={{ margin: "6px 0" }}
        primary={
          <Text style={{ fontSize: "1.05rem" }}>
            {userToDisplay.profile?.displayName ?? userToDisplay.handle}
          </Text>
        }
        secondary={
          workOrder?.id && (
            <Link
              to={`/home/workorders/${encodeURIComponent(workOrder.id)}`}
              state={{ isItemOwnedByUser: isInboxList /* Invoice INBOX = WorkOrder SENT */ }}
              onClick={handleClickWorkOrderLink}
              style={{ fontSize: "0.925rem", lineHeight: "1.25rem" }}
            >
              View Work Order
            </Link>
          )
        }
      />
      <StyledRightSideListItemTextContainer
        width="5rem"
        primary={<Text style={{ marginTop: "1px" }}>{formatNum.toCurrencyStr(amount)}</Text>}
      />
      <StyledRightSideListItemTextContainer
        width="4.75rem"
        primary={<Text variant="body2">{prettyCreatedAt}</Text>}
        secondary={
          <Text variant="caption" color="gray" style={{ display: "block" }}>
            {/* TODO try adding the INV-status-icon here */}
            {status.replace(/_/g, " ")}
          </Text>
        }
      />
    </CoreListItemLayout>
  );
};

const StyledRightSideListItemTextContainer = styled(ListItemText, {
  shouldForwardProp: (propName) => propName !== "width"
})<{ width: string }>(({ width }) => ({
  // height: "3.25rem",
  width,
  minWidth: width,
  maxWidth: width,
  margin: "6px 0 6px 0.5rem",
  textAlign: "right",

  "& > p:first-of-type": {
    marginTop: "1px",
    lineHeight: "1.5rem"
  }
}));
