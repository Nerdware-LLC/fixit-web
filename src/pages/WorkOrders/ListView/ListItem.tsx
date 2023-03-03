import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { CoreListItemLayout } from "@layouts";
import type { WorkOrder } from "@types";

export const WorkOrdersListItem = ({
  listName,
  item,
  onClick,
  ...props
}: {
  listName?: "Inbox" | "Sent";
  item?: WorkOrder;
  onClick?: React.ComponentProps<typeof CoreListItemLayout>["onClick"];
}) => {
  if (!listName || !item || !onClick) return null;

  const isInboxList = listName === "Inbox";
  const { createdBy, assignedTo, status, location, description, createdAt } = item;
  const userToDisplay = isInboxList ? createdBy : assignedTo;
  const prettyCreatedAt = createdAt.toLocaleDateString("en-us", { day: "numeric", month: "short" });

  return (
    <CoreListItemLayout
      user={userToDisplay}
      onClick={onClick}
      itemID={item.id}
      listName={listName}
      {...props}
    >
      <StyledMiddleContentContainer>
        {userToDisplay ? (
          <Text>{userToDisplay.profile?.displayName ?? userToDisplay.handle}</Text>
        ) : (
          <Text color="text.disabled" fontStyle="italic">
            - Unassigned -
          </Text>
        )}
        <Text color="text.secondary">{location.streetLine1}</Text>
        <Text color="text.secondary">{description}</Text>
      </StyledMiddleContentContainer>
      <ListItemText
        style={{ minWidth: "5.5rem", margin: "0 0 0 0.5rem", textAlign: "right" }}
        primary={
          <Text variant="body2" style={{ lineHeight: "1.5rem" }}>
            {prettyCreatedAt}
          </Text>
        }
        secondary={
          <Text variant="caption" color="gray" style={{ display: "block" }}>
            {/* TODO try adding the WO-status-icon here */}
            {status.replace(/_/g, " ")}
          </Text>
        }
      />
    </CoreListItemLayout>
  );
};

const StyledMiddleContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 0,
  flexShrink: 1,
  "& > .MuiTypography-root": {
    "&:first-of-type": {
      fontSize: "1.05rem",
      lineHeight: "1.5rem"
    },
    "&:not(:first-of-type)": {
      fontSize: "0.925rem",
      lineHeight: "1.25rem",
      color: theme.palette.text.secondary
    }
  }
}));
