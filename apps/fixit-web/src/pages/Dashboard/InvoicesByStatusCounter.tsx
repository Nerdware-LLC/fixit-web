import { INVOICE_STATUS_ICONS_JSX } from "@/components/Icons/InvoiceStatusIcon.jsx";
import { StatusCountWidget } from "@/components/Widgets/StatusCountWidget.jsx";
import { useDashboardDataContext } from "./DashboardDataContext";

export const InvoicesByStatusCounter = () => {
  const {
    widgetData: { InvoicesByStatusCounter },
  } = useDashboardDataContext();

  const { createdByUser, assignedToUser } = InvoicesByStatusCounter;

  return (
    <StatusCountWidget
      itemTypeLabel="Invoices"
      statusIcons={INVOICE_STATUS_ICONS_JSX}
      numCreatedByUserByStatus={createdByUser}
      numAssignedToUserByStatus={assignedToUser}
    />
  );
};
