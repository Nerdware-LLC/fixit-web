import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { ContactAvatar, WorkOrderCategoryChip, WorkOrderStatusChip } from "@components";
import { ItemDetails } from "@layouts/CoreItemView";
import { getDate, prettifyStr } from "@utils";
import { LocationDetails } from "./LocationDetails";
import { WorkOrderTimeline } from "./WorkOrderTimeline";
import { Checklist } from "./Checklist";
import type { WorkOrder } from "@types";

export const WorkOrderItemViewContent = ({
  workOrder,
  isItemOwnedByUser
}: {
  workOrder: WorkOrder;
  isItemOwnedByUser: boolean;
}) => {
  // prettier-ignore
  const { createdBy, assignedTo, status, priority, createdAt, location, category,
    description, checklist, entryContact, entryContactPhone, contractorNotes } = workOrder;

  // TODO On mobile, use Mui TABS to make the layout better

  return (
    <WorkOrderItemViewContentContainer id="work-order-item-view-content-container">
      {/* TOP LEFT - "main" */}

      <ItemDetails
        gridArea="main"
        header={
          <>
            <LocationDetails location={location} />
            <ItemDetails label="Status" style={{ marginLeft: "auto" }}>
              <WorkOrderStatusChip status={status} />
            </ItemDetails>
          </>
        }
      >
        <ItemDetails label="Description">{description}</ItemDetails>
        {
          // the <Checklist /> comp has a built-in "label", hence this ternary:
          checklist ? <Checklist checklist={checklist} /> : <ItemDetails label="Checklist" />
        }
        <ItemDetails label="Notes">{contractorNotes}</ItemDetails>
      </ItemDetails>

      {/* TOP RIGHT - "overview" */}

      <ItemDetails gridArea="overview" label="Overview" labelIcon={<InfoIcon />}>
        <ItemDetails label="Priority">
          {`${priority}${(priority === "HIGH" && status !== "COMPLETE" && ` ⚠️`) || ""}`}
        </ItemDetails>
        <ItemDetails label="Category">
          {category && <WorkOrderCategoryChip category={category} />}
        </ItemDetails>
        <ItemDetails label="Assigned To">
          {assignedTo && (
            <ContactAvatar contact={assignedTo} viewContactOnClick={isItemOwnedByUser} />
          )}
        </ItemDetails>
        <ItemDetails label="Created By">
          <ContactAvatar contact={createdBy} viewContactOnClick={!isItemOwnedByUser} />
        </ItemDetails>
        <ItemDetails label="Created">{getDate(createdAt)}</ItemDetails>
      </ItemDetails>

      {/* BOTTOM LEFT - "timeline" */}

      <ItemDetails gridArea="timeline" label="Timeline" labelIcon={<CalendarIcon />}>
        <WorkOrderTimeline workOrder={workOrder} isItemOwnedByUser={isItemOwnedByUser} />
      </ItemDetails>

      {/* BOTTOM RIGHT - "contact" */}

      <ItemDetails gridArea="contact" label="Entry Contact" labelIcon={<PersonIcon />}>
        <ItemDetails label="Name">{entryContact}</ItemDetails>
        <ItemDetails label="Phone">{prettifyStr.phone(entryContactPhone ?? "")}</ItemDetails>
      </ItemDetails>
    </WorkOrderItemViewContentContainer>
  );
};

const WorkOrderItemViewContentContainer = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  display: "grid",
  gridGap: "1rem",
  gridTemplateAreas: `
    'main overview'
    'timeline contact'
  `,
  gridTemplateRows: "1fr auto",
  gridTemplateColumns: "1fr auto",
  // TODO Until tabs are impl'd, allow x-scroll on mobile
  ...(theme.variables.isMobilePageLayout && { overflowX: "auto" })
}));
