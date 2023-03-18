import Text from "@mui/material/Typography";
import { CoreListItemLayout, type CoreListItemLayoutProps } from "@layouts";
import type { WorkOrder } from "@types";

export const WorkOrdersListItem = ({
  listName,
  item,
  onClick,
  ...props
}: {
  listName?: "Inbox" | "Sent";
  item?: WorkOrder;
  onClick?: CoreListItemLayoutProps["onClick"];
}) => {
  if (!listName || !item || !onClick) return null;

  const isInboxList = listName === "Inbox";
  const { createdBy, assignedTo, status, location, description, createdAt } = item;
  const userToDisplay = isInboxList ? createdBy : assignedTo;

  const prettyCreatedAt = createdAt.toLocaleDateString("en-us", { day: "numeric", month: "short" });
  const prettyStatus = status.replace(/_/g, " ");

  return (
    <CoreListItemLayout
      user={userToDisplay}
      onClick={onClick}
      itemID={item.id}
      listName={listName}
      {...props}
    >
      <div>
        {userToDisplay ? (
          <Text>{userToDisplay.profile?.displayName ?? userToDisplay.handle}</Text>
        ) : (
          <Text color="text.disabled" fontStyle="italic">
            - Unassigned -
          </Text>
        )}
        <Text>{location.streetLine1}</Text>
        <Text>{description}</Text>
      </div>
      <div>
        <Text className="list-item-created-at" variant="body2">
          {prettyCreatedAt}
        </Text>
        <Text className="list-item-status" variant="caption" component="p">
          {prettyStatus}
        </Text>
      </div>
    </CoreListItemLayout>
  );
};
