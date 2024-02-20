import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ToolsIcon from "@mui/icons-material/Construction";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import { WorkOrderCategoryChip } from "@/components/Chips/WorkOrderCategoryChip";
import { WorkOrderStatusChip } from "@/components/Chips/WorkOrderStatusChip";
import { LinkToWorkOrder } from "@/components/Navigation/LinkToWorkOrder";
import { getDateStr } from "@/utils/formatters/dateTime";
import { ItemDetails, type ItemDetailsProps } from "./ItemDetails";
import { ItemDetailsGroup } from "./ItemDetailsGroup";
import { LocationDetails } from "./LocationDetails";
import { dataDisplayClassNames } from "./classNames";
import type { Invoice } from "@/graphql/types";

/**
 * A component which displays info about an Invoice's WorkOrder on non-mobile
 * viewports, and a link to the WorkOrder on mobile viewports.
 */
export const InvoiceWorkOrderDetails = ({
  workOrder,
  label = "Work Order",
  sx,
  ...containerProps
}: InvoiceWorkOrderDetailsProps) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  // prettier-ignore
  const woLink = workOrder ? (
    <LinkToWorkOrder workOrderID={workOrder.id}>
      {!isMobilePageLayout ? <>View <ChevronRightIcon /></> : null}
    </LinkToWorkOrder>
  ) : null;

  return (
    <>
      {isMobilePageLayout ? (
        <ItemDetails
          label={label}
          sx={sx}
          className={dataDisplayClassNames.invoiceWorkOrderDetailsRoot}
          {...containerProps}
        >
          {woLink}
        </ItemDetails>
      ) : (
        <ItemDetailsGroup
          label={label}
          labelIcon={<ToolsIcon />}
          headerComponents={woLink}
          className={dataDisplayClassNames.invoiceWorkOrderDetailsRoot}
          style={{
            minWidth: "4rem",
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
          }}
          sx={{
            [`& > .${dataDisplayClassNames.groupHeader}`]: {
              [`& > .${dataDisplayClassNames.label}`]: {
                marginRight: "auto",
              },
              // The "View" anchor link in the header:
              "& a": {
                marginLeft: "1rem", // ensure at least 1rem of space between the label and the anchor
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              },
            },
            [`& > .${dataDisplayClassNames.groupContent}`]: {
              flexGrow: 1,
              justifyContent: "space-between",
            },
            ...sx,
          }}
          {...containerProps}
        >
          <ItemDetails label="Status">
            {workOrder?.status ? <WorkOrderStatusChip status={workOrder.status} /> : null}
          </ItemDetails>
          <LocationDetails location={workOrder?.location} />
          <ItemDetails label="Category">
            {workOrder?.category ? <WorkOrderCategoryChip category={workOrder.category} /> : null}
          </ItemDetails>
          <ItemDetails label="Created">
            {workOrder ? getDateStr(workOrder.createdAt) : null}
          </ItemDetails>
          <ItemDetails label="Updated">
            {workOrder ? getDateStr(workOrder.updatedAt) : null}
          </ItemDetails>
        </ItemDetailsGroup>
      )}
    </>
  );
};

export type InvoiceWorkOrderDetailsProps = {
  workOrder?: Invoice["workOrder"];
  label?: string;
} & Omit<ItemDetailsProps, "className">;
