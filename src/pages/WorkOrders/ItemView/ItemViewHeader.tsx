import { useNavigate } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { FileInvoiceDollarIcon } from "@components/Icons/FileInvoiceDollarIcon";
import { PenToSquareIcon } from "@components/Icons/PenToSquareIcon";
import type { WorkOrder } from "@graphql/types";

export const WorkOrderItemViewHeader = ({
  workOrder,
  isItemOwnedByUser,
}: {
  workOrder: WorkOrder;
  isItemOwnedByUser: boolean;
}) => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();

  const { onClick, startIcon, buttonText }: ButtonProps & { buttonText: string } = isItemOwnedByUser
    ? {
        onClick: () => nav("/home/workorders/form", { state: { workOrder } }),
        startIcon: <PenToSquareIcon />,
        buttonText: isMobilePageLayout ? "Edit" : "Update Work Order",
      }
    : {
        onClick: () => nav("/home/invoices/form", { state: { workOrderToInvoice: workOrder } }),
        startIcon: <FileInvoiceDollarIcon />,
        buttonText: "Create Invoice",
      };

  /*
    TODO Maybe convert the button/buttons into a single "ActionsButtonGroup" button.

    TODO Add WO ItemView buttons for assignee:
      - `Update Status`
      - `Update Checklist`
      - `Add Notes`
  */

  return (
    <>
      <Button
        className="wo-item-view-header-mutation-button"
        onClick={onClick}
        startIcon={startIcon}
        style={{
          height: "2rem",
          paddingBottom: "0.16rem",
          borderRadius: "1.5rem",
          ...(isMobilePageLayout && {
            fontSize: "1rem",
          }),
        }}
        sx={{
          "& svg": {
            marginRight: "0.2rem",
            marginBottom: "0.15rem",
          },
        }}
      >
        {buttonText}
      </Button>
    </>
  );
};
