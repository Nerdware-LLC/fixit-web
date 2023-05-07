import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PersonIcon from "@mui/icons-material/Person";
import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { WorkOrderCategoryChip } from "@components/Chips/WorkOrderCategoryChip";
import { WorkOrderStatusChip } from "@components/Chips/WorkOrderStatusChip";
import {
  XscrollContainer,
  xScrollContainerClassNames,
} from "@components/Containers/XscrollContainer";
import { ItemDetails } from "@components/DataDisplay/ItemDetails";
import { ItemDetailsGroup } from "@components/DataDisplay/ItemDetailsGroup";
import { LocationDetails } from "@components/DataDisplay/LocationDetails";
import { itemDetailsClassNames } from "@components/DataDisplay/classNames";
import { TabPanel, tabPabelClassNames } from "@components/Tabs";
import { getDate } from "@utils/dateTime";
import { prettifyStr } from "@utils/prettifyStr";
import { Checklist } from "./Checklist";
import { WorkOrderTimeline } from "./WorkOrderTimeline";
import { WO_ITEM_VIEW_TABS } from "./tabConfigs";
import type { WorkOrder, ChecklistItem } from "@graphql/types";

export const WorkOrderItemViewContent = ({
  workOrder,
  isItemOwnedByUser,
}: WorkOrderItemViewContentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  // prettier-ignore
  const { createdBy, assignedTo, status, priority, createdAt, location, category,
    description, checklist, entryContact, entryContactPhone, contractorNotes } = workOrder;

  return (
    <StyledDiv>
      <Tabs
        value={activeTabIndex}
        onChange={handleChangeTab}
        {...WO_ITEM_VIEW_TABS.A11Y_PROPS.tabsWrapperProps}
      >
        {WO_ITEM_VIEW_TABS.LABELS.map((tabLabel) => (
          <Tab
            key={`tab:${tabLabel.replace(/\s/g, "")}`}
            label={tabLabel}
            {...WO_ITEM_VIEW_TABS.A11Y_PROPS.tabProps[tabLabel]}
          />
        ))}
      </Tabs>

      {/* TAB PANEL: "Work Order" */}

      <TabPanel
        tab="Work Order"
        isActive={activeTabIndex === WO_ITEM_VIEW_TABS.ACTIVE_INDICES["Work Order"]}
      >
        <XscrollContainer>
          <div id={workOrderItemViewContentElementIDs.workOrderTabPanelGridContainer}>
            <ItemDetailsGroup gridArea="location" label="Address" labelIcon={<MapsHomeWorkIcon />}>
              <LocationDetails
                location={location}
                locationTextProps={{ variant: "h4" }}
                showLabel={false}
              />
            </ItemDetailsGroup>
            <ItemDetails gridArea="createdAt" label="Created">
              {getDate(createdAt)}
            </ItemDetails>
            <ItemDetails gridArea="status" label="Status">
              <WorkOrderStatusChip status={status} />
            </ItemDetails>
            <ItemDetails gridArea="createdBy" label="Created By">
              <ContactAvatar contact={createdBy} viewContactOnClick={!isItemOwnedByUser} />
            </ItemDetails>
            <ItemDetails gridArea="priority" label="Priority">
              {`${priority}${priority === "HIGH" && status !== "COMPLETE" ? ` ⚠️` : ""}`}
            </ItemDetails>
            <ItemDetails gridArea="assignedTo" label="Assigned To">
              {assignedTo && (
                <ContactAvatar contact={assignedTo} viewContactOnClick={isItemOwnedByUser} />
              )}
            </ItemDetails>
            <ItemDetails gridArea="category" label="Category">
              {category && <WorkOrderCategoryChip category={category} />}
            </ItemDetails>
          </div>
        </XscrollContainer>
        <ItemDetailsGroup gridArea="timeline" label="Timeline" labelIcon={<CalendarIcon />}>
          <XscrollContainer>
            <WorkOrderTimeline workOrder={workOrder} isItemOwnedByUser={isItemOwnedByUser} />
          </XscrollContainer>
        </ItemDetailsGroup>
      </TabPanel>

      {/* TAB PANEL: "Description" */}

      <TabPanel
        tab="Description"
        isActive={activeTabIndex === WO_ITEM_VIEW_TABS.ACTIVE_INDICES["Description"]}
      >
        <div id={workOrderItemViewContentElementIDs.descriptionTabPanelGridContainer}>
          <ItemDetails label="Description">{description}</ItemDetails>
          {
            // the <Checklist /> comp has a built-in "label", hence this ternary:
            Array.isArray(checklist) ? (
              <Checklist checklist={checklist as Array<ChecklistItem>} />
            ) : (
              <ItemDetails label="Checklist" />
            )
          }
          <ItemDetails label="Notes">{contractorNotes}</ItemDetails>
          <ItemDetailsGroup label="Entry Contact" labelIcon={<PersonIcon />}>
            <ItemDetails label="Name">{entryContact}</ItemDetails>
            <ItemDetails label="Phone">{prettifyStr.phone(entryContactPhone ?? "")}</ItemDetails>
          </ItemDetailsGroup>
        </div>
      </TabPanel>
    </StyledDiv>
  );
};

export const workOrderItemViewContentElementIDs = {
  workOrderTabPanelGridContainer: "wo-item-view-wo-tabpanel-grid-container",
  descriptionTabPanelGridContainer: "wo-item-view-description-tabpanel-grid-container",
};

const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${tabsClasses.root}`]: {
    margin: "0 2rem",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,

    ...(theme.variables.isMobilePageLayout && {
      width: "calc( 100% - 2rem )",
      margin: "0 1rem",

      [`& .${tabsClasses.flexContainer}`]: {
        justifyContent: "space-around",

        [`& > .${tabClasses.root}`]: {
          width: "45%",
          padding: "0.3rem 0 0 0",
        },
      },
    }),
  },

  // TabPanel containers:

  [`& > .${tabPabelClassNames.root}`]: {
    padding: "1.5rem 0",
    display: "flex",
    flexDirection: "column",
    gap: theme.variables.isMobilePageLayout ? "2rem" : "2rem 3rem",

    // TAB: WorkOrder

    "&[aria-labelledby=WorkOrder-tab]": {
      // X-scroll container:
      [`& > .${xScrollContainerClassNames.root}`]: {
        "&::before, &::after": {
          ...(theme.variables.isMobilePageLayout
            ? { width: "1rem", minWidth: "1rem" }
            : { width: "2rem", minWidth: "2rem" }),
        },
        // top-section grid layout container:
        [`& > #${workOrderItemViewContentElementIDs.workOrderTabPanelGridContainer}`]: {
          display: "grid",
          gap: "1rem 1.5rem",
          gridAutoRows: "min-content",
          gridTemplateColumns: "1fr min-content",
          gridTemplateAreas: `
            "location    location"
            "createdAt   status"
            "createdBy   priority"
            "assignedTo  category"`,
          // For viewports over 600px wide:
          [theme.breakpoints.up("sm")]: {
            gap: "2rem 3rem",
            gridTemplateColumns: "minmax(min-content,2.5fr) minmax(0,1fr) minmax(0,1fr)",
            gridTemplateAreas: `
              "location  status      createdAt"
              "location  assignedTo  createdBy"
              "location  priority    category"`,
          },
          // For viewports over 1200px wide:
          [theme.breakpoints.up("lg")]: {
            gridTemplateColumns:
              "minmax(min-content,2fr) minmax(0,0.5fr) minmax(0,1fr) minmax(0,1fr)",
            gridTemplateAreas: `
              "location  .  status      createdAt"
              "location  .  assignedTo  createdBy"
              "location  .  priority    category"`,
          },

          // LOCATION IDG:
          [`& > .${itemDetailsClassNames.groupContainer}`]: {
            minWidth: "min-content",
            maxWidth: "max-content",

            [`& > .${itemDetailsClassNames.groupContent}`]: {
              height: "calc(100% - 57px)",
              justifyContent: "center",
              padding: "1rem",
              [theme.breakpoints.up("sm")]: {
                padding: "2rem",
              },

              // LocationDetails content div:
              [`& .${itemDetailsClassNames.locationDetails} > .${itemDetailsClassNames.content}`]: {
                [`& > .${itemDetailsClassNames.locationDetailsAddressText}`]: {
                  ...(theme.variables.isMobilePageLayout
                    ? { fontSize: "1.5rem", lineHeight: "1.55rem" }
                    : { fontSize: "1.75rem", lineHeight: "1.8rem" }),
                },
              },
            },
          },
        },
      },
      // timeline ItemDetailsGroup
      [`& > .${itemDetailsClassNames.groupContainer}:last-of-type`]: {
        margin: theme.variables.isMobilePageLayout ? "0 1rem" : "0 2rem",

        [`& > .${itemDetailsClassNames.groupContent}`]: {
          padding: "0.1rem 0",
          backgroundColor: theme.palette.background.paper,
          "& *": {
            borderColor: alpha(theme.palette.divider, 0.05),
          },
        },
      },
    },

    // TAB: Description

    "&[aria-labelledby=Description-tab]": {
      padding: theme.variables.isMobilePageLayout ? "1.5rem 1rem" : "1.5rem 2rem",

      [`& #${workOrderItemViewContentElementIDs.descriptionTabPanelGridContainer}`]: {
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
        [theme.breakpoints.up("sm")]: {
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
  isItemOwnedByUser: boolean;
};
