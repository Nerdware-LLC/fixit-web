import { styled } from "@mui/material/styles";
import ToolsIcon from "@mui/icons-material/Construction";
import { WorkOrderCategoryChip } from "@/components/Chips/WorkOrderCategoryChip.jsx";
import { WorkOrderStatusChip } from "@/components/Chips/WorkOrderStatusChip.jsx";
import { LinkToWorkOrder } from "@/components/Navigation";
import { getDateStr } from "@/utils/formatters/dateTime.js";
import { ItemDetails, type ItemDetailsProps } from "./ItemDetails.jsx";
import { ItemDetailsGroup } from "./ItemDetailsGroup.jsx";
import { LocationDetails } from "./LocationDetails.jsx";
import { dataDisplayClassNames } from "./classNames.js";
import type { Invoice } from "@/types/graphql.js";

export type InvoiceWorkOrderDetailsProps = {
  workOrder?: Invoice["workOrder"];
  label?: string;
} & Omit<ItemDetailsProps, "className">;

/**
 * A component which displays info about an Invoice's WorkOrder on non-mobile
 * viewports, and a link to the WorkOrder on mobile viewports.
 */
export const InvoiceWorkOrderDetails = ({
  workOrder,
  label = "Work Order",
  ...containerProps
}: InvoiceWorkOrderDetailsProps) => (
  <ItemDetailsGroup
    label={label}
    labelIcon={<ToolsIcon />}
    headerComponents={
      workOrder ? (
        <LinkToWorkOrder workOrderID={workOrder.id} text="View" style={{ marginLeft: "auto" }} />
      ) : null
    }
    className={dataDisplayClassNames.invoiceWorkOrderDetailsRoot}
    {...containerProps}
  >
    <StyledDiv className={dataDisplayClassNames.invoiceWorkOrderDetailsContentWrapper}>
      <LocationDetails location={workOrder?.location} gridArea="location" />

      <ItemDetails label="Status" gridArea="status">
        {workOrder?.status ? <WorkOrderStatusChip status={workOrder.status} /> : null}
      </ItemDetails>
      <ItemDetails label="Category" gridArea="category">
        {workOrder?.category ? <WorkOrderCategoryChip category={workOrder.category} /> : null}
      </ItemDetails>

      <ItemDetails label="Created" gridArea="createdAt">
        {workOrder ? getDateStr(workOrder.createdAt) : null}
      </ItemDetails>
      <ItemDetails label="Updated" gridArea="updatedAt">
        {workOrder ? getDateStr(workOrder.updatedAt) : null}
      </ItemDetails>
    </StyledDiv>
  </ItemDetailsGroup>
);

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  minHeight: "min-content",
  height: "max-content",
  width: "fit-content",
  flexGrow: 1,

  // LAYOUT
  ...(variables.isMobilePageLayout
    ? {
        display: "grid",
        gap: "2rem",
        alignSelf: "center",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateAreas: `
          "location   location"
          "status     category"
          "createdAt  updatedAt"`,
      }
    : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "inherit",
      }),

  // LOCATION DETAILS
  [`& > .${dataDisplayClassNames.locationDetails}`]: {
    minWidth: "max-content",
    display: "flex",
    flexDirection: "column",
    [`& > .${dataDisplayClassNames.content}`]: {
      flexGrow: 1,
      justifyContent: "space-evenly",
    },
  },
}));
