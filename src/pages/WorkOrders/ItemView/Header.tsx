import Text from "@mui/material/Typography";
import { ItemDataDisplay } from "@layouts";
import { ContactAvatar } from "@components";
import { getDateTimeObj } from "@utils";
import type { WorkOrder } from "@types";

export const WorkOrderItemViewHeader = ({
  workOrder: { createdBy, assignedTo, status, priority, createdAt },
  isItemOwnedByUser
}: {
  workOrder: WorkOrder;
  isItemOwnedByUser: boolean;
}) => {
  const contact = isItemOwnedByUser === false ? createdBy : assignedTo;
  const { date, time } = getDateTimeObj(createdAt);
  const createdAtString = [date, time].join(`\n`);

  return (
    <>
      {/* COL 2 */}
      <ItemDataDisplay label="STATUS" labelVariant="subtitle2" styles={sharedStyles}>
        <Text>{status.replace(/_/g, " ")}</Text>
      </ItemDataDisplay>
      {/* COL 3 */}
      <ItemDataDisplay label="PRIORITY" labelVariant="subtitle2" styles={sharedStyles}>
        <Text style={{ whiteSpace: "nowrap" }}>
          {priority}
          {priority === "HIGH" && ` ⚠️`}
        </Text>
      </ItemDataDisplay>
      {/* COL 4 */}
      <ItemDataDisplay
        label={isItemOwnedByUser === false ? "CREATED BY" : "ASSIGNED TO"}
        labelVariant="subtitle2"
        styles={sharedStyles}
      >
        {contact ? <ContactAvatar contact={contact} /> : <Text>UNASSIGNED</Text>}
      </ItemDataDisplay>
      {/* COL 5 */}
      <ItemDataDisplay
        label="CREATED"
        labelVariant="subtitle2"
        styles={{
          ...sharedStyles,
          container: { margin: "0 0.5rem 0 1.5rem" }
        }}
      >
        <Text style={{ whiteSpace: "pre" }}>{createdAtString}</Text>
      </ItemDataDisplay>
    </>
  );
};

const sharedStyles = {
  container: { margin: "0 2rem" },
  label: { marginTop: "0.2rem" }
};
