import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { TabPanel, ContactAvatar, XscrollContainer } from "@components";
import { WorkOrderCategoryChip, WorkOrderStatusChip } from "@components/Chips";
import { ItemDetails, ItemDetailsGroup } from "@layouts/CoreItemView";
import { getDate, prettifyStr } from "@utils";
import { WO_ITEM_VIEW_TABS } from "./tabConfigs";
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
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  // prettier-ignore
  const { createdBy, assignedTo, status, priority, createdAt, location, category,
    description, checklist, entryContact, entryContactPhone, contractorNotes } = workOrder;

  return (
    <WorkOrderItemViewContentContainer>
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
          <div className="wo-item-view-workorder-tabpanel-top-section-grid-container">
            <LocationDetails gridArea="location" location={location} />
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
        <ItemDetails label="Description">{description}</ItemDetails>
        {
          // the <Checklist /> comp has a built-in "label", hence this ternary:
          checklist ? <Checklist checklist={checklist} /> : <ItemDetails label="Checklist" />
        }
        <div className="wo-item-view-description-tabpanel-bottom-layout">
          <ItemDetails label="Notes">{contractorNotes}</ItemDetails>
          <ItemDetailsGroup label="Entry Contact" labelIcon={<PersonIcon />}>
            <ItemDetails label="Name">{entryContact}</ItemDetails>
            <ItemDetails label="Phone">{prettifyStr.phone(entryContactPhone ?? "")}</ItemDetails>
          </ItemDetailsGroup>
        </div>
      </TabPanel>
    </WorkOrderItemViewContentContainer>
  );
};

const WorkOrderItemViewContentContainer = styled("div")(({ theme }) => ({
  "& .MuiTabs-root": {
    margin: "0 2rem",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,

    ...(theme.variables.isMobilePageLayout && {
      width: "calc( 100% - 2rem )",
      margin: "0 1rem",

      "& .MuiTabs-flexContainer": {
        justifyContent: "space-around",

        "& > .MuiTab-root": {
          width: "45%",
          padding: "0.3rem 0 0 0"
        }
      }
    })
  },

  // TabPanel containers:

  "& > .tab-panel": {
    padding: "1.5rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

    // TAB: Summary
    "&[aria-labelledby=WorkOrder-tab]": {
      // X-scroll container:
      "& > .x-scroll-container": {
        "&::before, &::after": {
          width: theme.variables.isMobilePageLayout ? "1rem" : "2rem"
        },
        // top-section grid layout container:
        "& > .wo-item-view-workorder-tabpanel-top-section-grid-container": {
          display: "grid",
          gap: theme.variables.isMobilePageLayout ? "1rem 1.5rem" : "1.5rem",
          gridTemplateColumns: "1fr min-content",
          // For viewports under 600px wide:
          gridTemplateRows: "auto repeat( 3, min-content )",
          gridTemplateAreas: `
            "location location"
            "createdAt status"
            "createdBy priority"
            "assignedTo category"`,
          // For viewports over 600px wide:
          [theme.breakpoints.up("sm")]: {
            gridTemplateAreas: `
              "location createdAt"
              "location status"
              "createdBy priority"
              "assignedTo category"`
          }
        }
      },
      // timeline ItemDetailsGroup
      "& > .item-details-group:last-of-type": {
        padding: theme.variables.isMobilePageLayout ? "0 1rem" : "0 2rem",

        "& > .item-details-group-content": {
          padding: "0.1rem 0",
          backgroundColor: theme.palette.background.paper,
          "& *": {
            borderColor: alpha(theme.palette.divider, 0.05)
          }
        }
      }
    },

    // TAB: Description
    "&[aria-labelledby=Description-tab]": {
      padding: theme.variables.isMobilePageLayout ? "1.5rem 1rem" : "1.5rem 2rem",

      "& > div": {
        "&.wo-item-view-description-tabpanel-bottom-layout": {
          display: "flex",
          gap: "2rem",
          flexDirection: theme.variables.isMobilePageLayout ? "column" : "row",

          "& > div": {
            ...(!theme.variables.isMobilePageLayout && {
              width: "50%"
            })
          },

          "& > .item-details-group": {
            backgroundColor: theme.palette.background.paper
          }
        }
      }
    }
  }
}));
