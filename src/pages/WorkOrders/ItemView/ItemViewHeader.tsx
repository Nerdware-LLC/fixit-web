import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { PenToSquareIcon, FileInvoiceDollarIcon } from "@components";
import type { WorkOrder } from "@types";

export const WorkOrderItemViewHeader = ({
  workOrder,
  isItemOwnedByUser
}: {
  workOrder: WorkOrder;
  isItemOwnedByUser: boolean;
}) => {
  const nav = useNavigate();

  const {
    onClick,
    startIcon,
    buttonText
  }: React.ComponentProps<typeof Button> & { buttonText: string } = isItemOwnedByUser
    ? {
        onClick: () => nav("/home/workorders/form", { state: { workOrder } }),
        startIcon: <PenToSquareIcon />,
        buttonText: "Update Work Order"
      }
    : {
        onClick: () => nav("/home/invoices/form", { state: { workOrderToInvoice: workOrder } }),
        startIcon: <FileInvoiceDollarIcon />,
        buttonText: "Create Invoice"
      };

  /*
    TODO Add WO ItemView buttons for assignee:
      - `Update Status`
      - `Update Checklist`
      - `Add Notes`
  */

  return (
    <Button
      className="wo-item-view-header-mutation-button"
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        height: "2rem",
        width: "14rem",
        paddingBottom: "0.16rem",
        borderRadius: "1.5rem"

        // height: "2.25rem",
        // fontSize: "1rem",
        // "& svg": {
        //   marginRight: "0.2rem",
        //   marginBottom: "0.2rem"
        // }
      }}
    >
      {buttonText}
    </Button>
  );
};
