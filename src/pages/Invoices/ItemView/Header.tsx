import Text from "@mui/material/Typography";
import { ItemDataDisplay } from "@layouts";
import { InvoiceStatusChip, ContactAvatar, Link } from "@components";
import { getDateTimeObj } from "@utils";
import type { Invoice } from "@types";

export const InvoiceItemViewHeader = ({
  invoice: { createdBy, assignedTo, status, workOrderID, createdAt },
  isItemOwnedByUser
}: {
  invoice: Invoice;
  isItemOwnedByUser: boolean;
}) => {
  const contact = isItemOwnedByUser === false ? createdBy : assignedTo;
  const { date, time } = getDateTimeObj(createdAt);
  const createdAtString = [date, time].join(`\n`);

  // TODO Add buttons to UpdateInvoice if SENDER, PAY Invoice if RECEIVER

  return (
    <>
      {/* COL 2 */}
      <ItemDataDisplay label="WORK ORDER" labelVariant="subtitle2" styles={sharedStyles}>
        {workOrderID ? (
          <Link
            to={`/home/workorders/${workOrderID}`}
            state={{ isItemOwnedByUser: !isItemOwnedByUser }}
            // NOTE re above: WO ownership will always be the inverse of INV ownership
          >
            View Work Order
          </Link>
        ) : (
          <Text>-</Text>
        )}
      </ItemDataDisplay>
      {/* COL 3 */}
      <ItemDataDisplay label="STATUS" labelVariant="subtitle2" styles={sharedStyles}>
        <InvoiceStatusChip status={status} />
      </ItemDataDisplay>
      {/* COL 4 */}
      <ItemDataDisplay
        label={isItemOwnedByUser === false ? "SENDER" : "RECIPIENT"}
        labelVariant="subtitle2"
        styles={sharedStyles}
      >
        <ContactAvatar contact={contact} />
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
