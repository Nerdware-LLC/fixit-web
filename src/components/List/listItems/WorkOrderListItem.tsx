import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Text from "@mui/material/Typography";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { WorkOrderStatusIcon } from "@/components/Icons/WorkOrderStatusIcon";
import type { WorkOrder } from "@/types/graphql.js";
import type { Simplify } from "type-fest";

/**
 * A list-item component that can be used to render a WorkOrder within a list.
 *
 * > _For `AutoComplete` options, use this component in the `renderOption`
 *   function, **not** `WorkOrderListItemButton`_.
 */
export const WorkOrderListItem = ({
  workOrder,
  userToDisplay,
  divider = true,
  ...listItemProps
}: WorkOrderListItemProps) => (
  <ListItem divider={divider} {...listItemProps}>
    <WorkOrderListItemContent workOrder={workOrder} userToDisplay={userToDisplay} />
  </ListItem>
);

/**
 * A list-item-_**button**_ component that can be used to render a WorkOrder within a list.
 *
 * > _**Do not use this component in the `renderOption` function of an `AutoComplete` component.
 *   Instead use {@link WorkOrderListItem}.**_
 */
export const WorkOrderListItemButton = ({
  workOrder,
  userToDisplay,
  divider = true,
  ...listItemButtonProps
}: WorkOrderListItemButtonProps) => (
  <ListItemButton divider={divider} {...listItemButtonProps}>
    <WorkOrderListItemContent workOrder={workOrder} userToDisplay={userToDisplay} />
  </ListItemButton>
);

/**
 * Content for the {@link WorkOrderListItem} and {@link WorkOrderListItemButton} components.
 */
const WorkOrderListItemContent = ({ workOrder, userToDisplay }: WorkOrderListItemContentProps) => {
  // Get `userToDisplay` values (if any)
  const { displayName, photoUrl } = userToDisplay?.profile ?? {};

  // Get other WO values
  const { status, location, description, createdAt } = workOrder;

  // Apply formatting to "prettify" values
  const prettyCreatedAt = dayjs(createdAt).format("MMM D");
  const prettyStatus = status.replace(/_/g, " ");

  return (
    <>
      <ListItemAvatar>
        <Avatar
          src={photoUrl || undefined}
          alt={displayName || "Icon indicating an unassigned work order"}
        >
          {displayName?.charAt(0) || <PersonOffIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Text sx={{ ...(!displayName && { color: "text.disabled", fontStyle: "italic" }) }}>
              {displayName || "- Unassigned -"}
            </Text>
            <Text
              component="span"
              style={{ fontSize: "0.8rem", position: "absolute", right: 0, top: "0.1rem" }}
            >
              {prettyCreatedAt}
            </Text>
          </>
        }
        secondary={
          <>
            <Text component="span" variant="body2" color="text.primary" style={{ opacity: 0.9 }}>
              {location.streetLine1}
              <br />
            </Text>
            <Text component="span" variant="body2">
              {description}
            </Text>
            <Tooltip title={prettyStatus} placement="right">
              <WorkOrderStatusIcon
                status={status}
                style={{
                  fontSize: "1.65rem",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              />
            </Tooltip>
          </>
        }
        style={{ position: "relative", paddingRight: "3rem" }}
        sx={{ "& *": { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } }}
      />
    </>
  );
};

export type WorkOrderListItemProps = Simplify<
  WorkOrderListItemContentProps & Omit<ListItemProps, "children">
>;

export type WorkOrderListItemButtonProps = Simplify<
  WorkOrderListItemContentProps & Omit<ListItemButtonProps, "children">
>;

type WorkOrderListItemContentProps = {
  workOrder: WorkOrder;
  userToDisplay: WorkOrder["createdBy" | "assignedTo"];
};
