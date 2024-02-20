import { useNavigate } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import { FileInvoiceDollarIcon } from "@/components/Icons/FileInvoiceDollarIcon";
import { PenToSquareIcon } from "@/components/Icons/PenToSquareIcon";
import { APP_PATHS } from "@/routes/appPaths";
import type { WorkOrder } from "@/graphql/types";

/**
 * // IDEA Maybe convert the button/buttons into a single "ActionsButtonGroup" button.
 * // IDEA Add WO ItemView buttons for assignee:
 * - `Update Status`
 * - `Update Checklist`
 * - `Add Notes`
 */
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
        buttonText: isMobilePageLayout ? "Edit" : "Update Work Order",
        startIcon: <PenToSquareIcon />,
        onClick: () => {
          nav(APP_PATHS.WORK_ORDERS_FORM_VIEW, { state: { workOrder } });
        },
      }
    : {
        buttonText: "Create Invoice",
        startIcon: <FileInvoiceDollarIcon />,
        onClick: () => {
          nav(APP_PATHS.INVOICES_FORM_VIEW, { state: { workOrderToInvoice: workOrder } });
        },
      };

  return (
    <>
      <Button
        onClick={onClick}
        startIcon={startIcon}
        style={{
          height: "2rem",
          borderRadius: "1.5rem",
          ...(isMobilePageLayout && { fontSize: "1rem" }),
        }}
      >
        {buttonText}
      </Button>
    </>
  );
};
