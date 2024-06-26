import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ToolsIcon from "@mui/icons-material/Construction";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { WorkOrderCategoryChip } from "@/components/Chips/WorkOrderCategoryChip.jsx";
import { WorkOrderStatusChip } from "@/components/Chips/WorkOrderStatusChip.jsx";
import { LinkToWorkOrder } from "@/components/Navigation/LinkToWorkOrder.jsx";
import { getDateStr } from "@/utils/formatters/dateTime.js";
import { ItemDetails, type ItemDetailsProps } from "./ItemDetails.jsx";
import { ItemDetailsGroup } from "./ItemDetailsGroup.jsx";
import { LocationDetails } from "./LocationDetails.jsx";
import { dataDisplayClassNames } from "./classNames.js";
import type { Invoice } from "@/types/graphql.js";

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
