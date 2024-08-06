import { styled } from "@mui/material/styles";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PersonIcon from "@mui/icons-material/Person";
import { ContactAvatar } from "@/components/Avatar/ContactAvatar.jsx";
import { WorkOrderCategoryChip } from "@/components/Chips/WorkOrderCategoryChip.jsx";
import { WorkOrderStatusChip } from "@/components/Chips/WorkOrderStatusChip.jsx";
import { XscrollContainer, containerClassNames } from "@/components/Containers";
import { ItemDetails } from "@/components/DataDisplay/ItemDetails.jsx";
import { ItemDetailsGroup } from "@/components/DataDisplay/ItemDetailsGroup.jsx";
import { LocationDetails } from "@/components/DataDisplay/LocationDetails.jsx";
import { dataDisplayClassNames } from "@/components/DataDisplay/classNames.js";
import { Tabs, tabsClassNames } from "@/components/Tabs";
import { getDateStr, prettifyPhoneNumStr } from "@/utils/formatters";
import { WorkOrderItemViewChecklist } from "./WorkOrderItemViewChecklist.jsx";
import { WorkOrderTimeline } from "./WorkOrderTimeline.jsx";
import { woItemViewElementIDs } from "./elementIDs.js";
import type { WorkOrder } from "@/types/graphql.js";

export const WorkOrderItemViewContent = ({ workOrder }: WorkOrderItemViewContentProps) => {
  // prettier-ignore
  const { createdBy, assignedTo, status, priority, createdAt, location, category,
    description, checklist, entryContact, entryContactPhone, contractorNotes } = workOrder;

  return (
    <StyledDiv>
      <Tabs
        aria-label="work order item view tabs"
        tabsContentMap={{
          "Work Order": (
            <>
              <XscrollContainer>
                <div id={woItemViewElementIDs.workOrderTabPanelGridContainer}>
                  <ItemDetailsGroup
                    gridArea="location"
                    label="Address"
                    labelIcon={<MapsHomeWorkIcon />}
                  >
                    <LocationDetails
                      location={location}
                      locationTextProps={{ variant: "h4" }}
                      showLabel={false}
                    />
                  </ItemDetailsGroup>
                  <ItemDetails gridArea="createdAt" label="Created">
                    {getDateStr(createdAt)}
                  </ItemDetails>
                  <ItemDetails gridArea="status" label="Status">
                    <WorkOrderStatusChip status={status} />
                  </ItemDetails>
                  <ItemDetails gridArea="createdBy" label="Created By">
                    <ContactAvatar contact={createdBy} />
                  </ItemDetails>
                  <ItemDetails gridArea="priority" label="Priority">
                    {`${priority}${priority === "HIGH" && status !== "COMPLETE" ? ` ⚠️` : ""}`}
                  </ItemDetails>
                  <ItemDetails gridArea="assignedTo" label="Assigned To">
                    {assignedTo && <ContactAvatar contact={assignedTo} />}
                  </ItemDetails>
                  <ItemDetails gridArea="category" label="Category">
                    {category && <WorkOrderCategoryChip category={category} />}
                  </ItemDetails>
                </div>
              </XscrollContainer>
              <ItemDetailsGroup gridArea="timeline" label="Timeline" labelIcon={<CalendarIcon />}>
                <XscrollContainer>
                  <WorkOrderTimeline workOrder={workOrder} />
                </XscrollContainer>
              </ItemDetailsGroup>
            </>
          ),
          Description: (
            <div id={woItemViewElementIDs.descriptionTabPanelGridContainer}>
              <ItemDetails label="Description">{description}</ItemDetails>
              <WorkOrderItemViewChecklist label="Checklist" checklist={checklist} />
              <ItemDetails label="Notes">{contractorNotes}</ItemDetails>
              <ItemDetailsGroup label="Entry Contact" labelIcon={<PersonIcon />}>
                <ItemDetails label="Name">{entryContact}</ItemDetails>
                <ItemDetails label="Phone">
                  {entryContactPhone ? prettifyPhoneNumStr(entryContactPhone) : ""}
                </ItemDetails>
              </ItemDetailsGroup>
            </div>
          ),
        }}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { variables, breakpoints } }) => {
  const spacing = variables.isMobilePageLayout ? "1.5rem" : "2rem";

  return {
    padding: `0 ${spacing}`,

    // TabPanel containers:
    [`& > .${tabsClassNames.tabPanel.root}`]: {
      padding: `${spacing} 0`,
      display: "flex",
      flexDirection: "column",
      gap: spacing,

      // TAB: WorkOrder

      "&[aria-labelledby=workorder-tab]": {
        // TOP SECTION (X-scroll container):
        [`& > .${containerClassNames.xScrollContainerRoot}`]: {
          paddingBottom: `calc( ${spacing} / 2 )`,
          marginBottom: `calc( -${spacing} / 2 )`,

          // top-section grid layout container:
          [`& > #${woItemViewElementIDs.workOrderTabPanelGridContainer}`]: {
            display: "grid",
            gap: spacing,
            gridAutoRows: "min-content",
            gridTemplateColumns: "repeat(2, minmax(8rem,1fr))",
            gridTemplateAreas: `
              "location    location"
              "createdAt   status"
              "createdBy   priority"
              "assignedTo  category"`,
            // For viewports over 600px wide:
            [breakpoints.up("sm")]: {
              transform: "translateX(-1rem)", // shift grid to the left for XScroll pseudo-elements
              gridTemplateColumns: "minmax(min-content,2fr) repeat(2, minmax(8rem,1fr))",
              gridTemplateAreas: `
                "location  status      createdAt"
                "location  assignedTo  createdBy"
                "location  priority    category"`,
            },

            // LOCATION IDG:
            [`& > .${dataDisplayClassNames.groupRoot}`]: {
              display: "flex",
              flexDirection: "column",
              minWidth: "min-content",
              width: "100%",
              [breakpoints.up("sm")]: { width: "66%" },

              [`& > .${dataDisplayClassNames.groupContent}`]: {
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: `calc( ${spacing} - 0.5rem )`,
                // LocationDetails text:
                [`& .${dataDisplayClassNames.locationDetailsAddressText}`]: {
                  fontSize: "1.25rem",
                  [breakpoints.up("xl")]: { fontSize: "1.75rem" },
                },
              },
            },
          },
        },
        // BOTTOM SECTION (timeline ItemDetailsGroup):
        [`& > .${dataDisplayClassNames.groupRoot}:last-of-type`]: {
          [`& > .${dataDisplayClassNames.groupContent}`]: {
            padding: "0.1rem 0",
          },
        },
      },

      // TAB: Description

      "&[aria-labelledby=description-tab]": {
        // padding: variables.isMobilePageLayout ? "1.5rem 1rem" : "1.5rem 2rem",

        [`& #${woItemViewElementIDs.descriptionTabPanelGridContainer}`]: {
          display: "grid",
          gridAutoRows: "min-content",
          gridAutoColumns: "1fr",
          gap: "2rem",
          gridTemplateAreas: `
            "description"
            "checklist"
            "notes"
            "entry"`,
          // For viewports over 600px wide:
          [breakpoints.up("sm")]: {
            gap: "3rem",
            gridTemplateAreas: `
              "description  checklist"
              "notes        entry"`,
          },
          "& > div": {
            // CHILDREN
            "&:nth-of-type(1)": { gridArea: "description" },
            "&:nth-of-type(2)": { gridArea: "checklist" },
            "&:nth-of-type(3)": { gridArea: "notes" },
            "&:nth-of-type(4)": { gridArea: "entry" },
          },
        },
      },
    },
  };
});

export type WorkOrderItemViewContentProps = {
  workOrder: WorkOrder;
};
