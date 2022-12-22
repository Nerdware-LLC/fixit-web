import { styled } from "@mui/material/styles";
import { CoreListItemLayout } from "@layouts";
import { WorkOrderStatusIcon } from "@components";
import type { WorkOrder } from "@types";

export const WorkOrdersListItem = ({
  parentListName,
  item,
  onClick
}: {
  parentListName?: "Inbox" | "Sent";
  item?: WorkOrder;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  if (!parentListName || !item || !onClick) return null;

  const isInboxList = parentListName === "Inbox";

  const prettyCreatedAt = item.createdAt.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <CoreListItemLayout
      onClick={onClick}
      topRowComponents={
        <>
          <div style={styles.topLeftGrid}>
            <span style={{ gridArea: "1 / 1", fontWeight: "bold" }}>
              {isInboxList ? "FROM:" : "TO:"}
            </span>
            <span style={{ gridArea: "1 / 2" }}>
              {isInboxList
                ? item.createdBy.profile.displayName
                : item?.assignedTo?.profile.displayName ?? ""}
            </span>
            <span style={{ gridArea: "2 / 1", fontWeight: "bold" }}>DATE:</span>
            <span style={{ gridArea: "2 / 2" }}>{prettyCreatedAt}</span>
          </div>
          <span style={{ paddingTop: "1px" }}>{item.status.replace(/_/g, " ")}</span>
          <WorkOrderStatusIcon
            status={item.status as WorkOrder["status"]}
            style={{ marginLeft: "0.5rem" }}
          />
        </>
      }
      bottomRowComponents={
        <Box style={{ flexDirection: "column" }}>
          {"location" in item && <div>{item.location.streetLine1}</div>}
          {"description" in item && <div style={styles.description}>{item.description}</div>}
        </Box>
      }
    />
  );
};

const Box = styled("div")`
  width: 100%;
  display: flex;
`;

const styles: Record<string, React.CSSProperties> = {
  topLeftGrid: {
    marginRight: "auto",
    display: "grid",
    gridTemplate: "auto auto / 3.5rem auto"
  },
  description: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};
