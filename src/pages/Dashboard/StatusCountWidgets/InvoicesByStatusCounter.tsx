import { INV_STATUS_ICON_REACT_NODES } from "@components/Icons/InvoiceStatusIcon";
import { StatusCountWidget } from "./StatusCountWidget";
import { useDashboardDataContext } from "../DashboardDataContext";

export const InvoicesByStatusCounter = () => {
  const {
    widgetData: { InvoicesByStatusCounter },
  } = useDashboardDataContext();

  const { createdByUser, assignedToUser } = InvoicesByStatusCounter;

  return (
    <StatusCountWidget
      itemTypeLabel="Invoices"
      statusIcons={INV_STATUS_ICON_REACT_NODES}
      numCreatedByUserByStatus={createdByUser}
      numAssignedToUserByStatus={assignedToUser}
    />
  );
};
