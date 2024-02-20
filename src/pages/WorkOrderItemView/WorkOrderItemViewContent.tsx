import { styled, alpha } from "@mui/material/styles";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PersonIcon from "@mui/icons-material/Person";
import { ContactAvatar } from "@/components/Avatar/ContactAvatar";
import { WorkOrderCategoryChip } from "@/components/Chips/WorkOrderCategoryChip";
import { WorkOrderStatusChip } from "@/components/Chips/WorkOrderStatusChip";
import { XscrollContainer, containerClassNames } from "@/components/Containers";
import { ItemDetails } from "@/components/DataDisplay/ItemDetails";
import { ItemDetailsGroup } from "@/components/DataDisplay/ItemDetailsGroup";
import { LocationDetails } from "@/components/DataDisplay/LocationDetails";
import { dataDisplayClassNames } from "@/components/DataDisplay/classNames";
import { Tabs, tabsClassNames } from "@/components/Tabs";
import { fmt } from "@/utils/formatters";
import { WorkOrderItemViewChecklist } from "./WorkOrderItemViewChecklist";
import { WorkOrderTimeline } from "./WorkOrderTimeline";
import type { WorkOrder } from "@/graphql/types";

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
                <div id={elementIDs.workOrderTabPanelGridContainer}>
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
                    {fmt.getDateStr(createdAt)}
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
            <div id={elementIDs.descriptionTabPanelGridContainer}>
              <ItemDetails label="Description">{description}</ItemDetails>
              <WorkOrderItemViewChecklist label="Checklist" checklist={checklist} />
              <ItemDetails label="Notes">{contractorNotes}</ItemDetails>
              <ItemDetailsGroup label="Entry Contact" labelIcon={<PersonIcon />}>
                <ItemDetails label="Name">{entryContact}</ItemDetails>
                <ItemDetails label="Phone">
                  {entryContactPhone ? fmt.prettifyPhoneNum(entryContactPhone) : ""}
                </ItemDetails>
              </ItemDetailsGroup>
            </div>
          ),
        }}
      />
    </StyledDiv>
  );
};

const elementIDs = {
  workOrderTabPanelGridContainer: "wo-item-view-wo-tabpanel-grid-container",
  descriptionTabPanelGridContainer: "wo-item-view-description-tabpanel-grid-container",
};

const StyledDiv = styled("div")(({ theme: { palette, variables, breakpoints } }) => ({
  [`& .${tabsClassNames.muiTabs.root}`]: {
    margin: "0 2rem",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: palette.divider,

    ...(variables.isMobilePageLayout && {
      width: "calc( 100% - 2rem )",
      margin: "0 1rem",

      [`& .${tabsClassNames.muiTabs.flexContainer}`]: {
        justifyContent: "space-around",

        [`& > .${tabsClassNames.muiTab.root}`]: {
          width: "45%",
          padding: "0.3rem 0 0 0",
        },
      },
    }),
  },

  // TabPanel containers:

  [`& > .${tabsClassNames.tabPanel.root}`]: {
    padding: "1.5rem 0",
    display: "flex",
    flexDirection: "column",
    gap: variables.isMobilePageLayout ? "2rem" : "2rem 3rem",

    // TAB: WorkOrder

    "&[aria-labelledby=workorder-tab]": {
      // X-scroll container:
      [`& > .${containerClassNames.xScrollContainerRoot}`]: {
        "&::before, &::after": {
          width: "2rem",
          minWidth: "2rem",
        },
        // top-section grid layout container:
        [`& > #${elementIDs.workOrderTabPanelGridContainer}`]: {
          display: "grid",
          gap: "1rem 1.5rem",
          gridAutoRows: "min-content",
          gridTemplateColumns: "repeat(2, minmax(8rem,1fr))",
          gridTemplateAreas: `
            "location    location"
            "createdAt   status"
            "createdBy   priority"
            "assignedTo  category"`,
          // For viewports over 600px wide:
          [breakpoints.up("sm")]: {
            gap: "2rem",
            gridTemplateColumns: "minmax(min-content,2fr) repeat(2, minmax(8rem,1fr))",
            gridTemplateAreas: `
              "location  status      createdAt"
              "location  assignedTo  createdBy"
              "location  priority    category"`,
          },
          // For viewports over 1200px wide:
          [breakpoints.up("lg")]: {
            gridTemplateColumns:
              "minmax(min-content,2fr) minmax(0,0.5fr) repeat(2, minmax(10rem,1fr))",
            gridTemplateAreas: `
              "location  .  status      createdAt"
              "location  .  assignedTo  createdBy"
              "location  .  priority    category"`,
          },

          // LOCATION IDG:
          [`& > .${dataDisplayClassNames.groupRoot}`]: {
            minWidth: "min-content",
            [breakpoints.down("sm")]: {
              width: "calc(100% + 1rem)",
              transform: "translateX(-0.5rem)",
            },
            ...(!variables.isMobilePageLayout && { maxWidth: "max-content" }),

            [`& > .${dataDisplayClassNames.groupContent}`]: {
              height: "calc(100% - 57px)",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              [breakpoints.up("sm")]: {
                padding: "2rem",
              },

              // LocationDetails content div:
              [`& .${dataDisplayClassNames.locationDetails} > .${dataDisplayClassNames.content}`]: {
                transform: "translateY(-0.25rem)",
                gap: "0.25rem",

                [`& > .${dataDisplayClassNames.locationDetailsAddressText}`]: {
                  width: "fit-content",
                  fontSize: "1.25rem",
                  [breakpoints.up("xl")]: { fontSize: "1.75rem" },
                },
              },
            },
          },
        },
      },
      // timeline ItemDetailsGroup
      [`& > .${dataDisplayClassNames.groupRoot}:last-of-type`]: {
        margin: variables.isMobilePageLayout ? "0 1.5rem" : "0 2rem",

        [`& > .${dataDisplayClassNames.groupContent}`]: {
          padding: "0.1rem 0",
          backgroundColor: palette.background.paper,
          "& *": {
            borderColor: alpha(palette.divider, 0.05),
          },
        },
      },
    },

    // TAB: Description

    "&[aria-labelledby=description-tab]": {
      padding: variables.isMobilePageLayout ? "1.5rem 1rem" : "1.5rem 2rem",

      [`& #${elementIDs.descriptionTabPanelGridContainer}`]: {
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
          "&:nth-of-type(1)": {
            gridArea: "description",
          },
          "&:nth-of-type(2)": {
            gridArea: "checklist",
          },
          "&:nth-of-type(3)": {
            gridArea: "notes",
          },
          "&:nth-of-type(4)": {
            gridArea: "entry",
          },
        },
      },
    },
  },
}));

export type WorkOrderItemViewContentProps = {
  workOrder: WorkOrder;
};
