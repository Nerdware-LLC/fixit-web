import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ToolsIcon from "@mui/icons-material/Construction";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { WorkOrderCategoryChip } from "@components/Chips/WorkOrderCategoryChip";
import { WorkOrderStatusChip } from "@components/Chips/WorkOrderStatusChip";
import { ItemDetails } from "@components/DataDisplay/ItemDetails";
import { ItemDetailsGroup } from "@components/DataDisplay/ItemDetailsGroup";
import { LocationDetails } from "@components/DataDisplay/LocationDetails";
import { itemDetailsClassNames } from "@components/DataDisplay/classNames";
import { LinkToWorkOrder } from "@components/Navigation/LinkToWorkOrder";
import { getDate } from "@utils/dateTime";
import type { ItemDetailsProps } from "@components/DataDisplay";
import type { Invoice } from "@graphql/types";

/**
 * A component which displays info about an Invoice's WorkOrder on non-mobile
 * viewports, and a link to the WorkOrder on mobile viewports.
 */
export const InvoiceWorkOrderInfo = ({
  workOrder,
  label = "Work Order",
  sx,
  ...containerProps
}: InvoiceWorkOrderInfoProps) => {
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
          className={invWorkOrderInfoClassNames.root}
          {...containerProps}
        >
          {woLink}
        </ItemDetails>
      ) : (
        <ItemDetailsGroup
          label={label}
          labelIcon={<ToolsIcon />}
          headerComponents={woLink}
          className={invWorkOrderInfoClassNames.root}
          style={{
            minWidth: "4rem",
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
          }}
          sx={{
            [`& > .${itemDetailsClassNames.groupHeader}`]: {
              [`& > .${itemDetailsClassNames.label}`]: {
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
            [`& > .${itemDetailsClassNames.groupContent}`]: {
              flexGrow: 1,
              justifyContent: "space-between",
            },
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
            {workOrder ? getDate(workOrder.createdAt) : null}
          </ItemDetails>
          <ItemDetails label="Updated">
            {workOrder ? getDate(workOrder.updatedAt) : null}
          </ItemDetails>
        </ItemDetailsGroup>
      )}
    </>
  );
};

export const invWorkOrderInfoClassNames = {
  root: "invoice-work-order-info-root",
};

export type InvoiceWorkOrderInfoProps = {
  workOrder?: Invoice["workOrder"];
  label?: string;
} & ItemDetailsProps;
