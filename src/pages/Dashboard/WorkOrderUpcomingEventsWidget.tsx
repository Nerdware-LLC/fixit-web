import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled, darken } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/material/ListItemButton";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import ListItemText, { listItemTextClasses } from "@mui/material/ListItemText";
import Paper, { paperClasses } from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import ConstructionIcon from "@mui/icons-material/Construction";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { EmptyListFallback } from "@components/HelpInfo";
import { useDashboardDataContext, type WorkOrderWithUpcomingEvent } from "./DashboardDataContext";
import { SmallWidgetLayout } from "./SmallWidgetLayout";

export const WorkOrderUpcomingEventsWidget = () => {
  const nav = useNavigate();
  const {
    widgetData: { WorkOrderUpcomingEvents },
  } = useDashboardDataContext();

  const sortedEvents = useMemo(() => {
    // prettier-ignore
    return Object.entries(WorkOrderUpcomingEvents).reduce(
        (
          acc: Array<WorkOrderWithUpcomingEvent & { handleClickListItemBtn: React.MouseEventHandler<HTMLDivElement> }>,
          [woListName, workOrders]
        ) => [
          ...acc,
          ...workOrders.map((wo) => ({
            ...wo,
            handleClickListItemBtn: () => {
              nav(`/home/workorders/${encodeURIComponent(wo.id)}`, {
                state: { isItemOwnedByUser: woListName === "createdByUser" },
              });
            },
          })),
        ], []
      ) // sort return -1 = put A before B, 1 = put A after B
      .sort((woA, woB) => (woA.eventDate.getTime() > woB.eventDate.getTime() ? 1 : -1));
  }, [nav, WorkOrderUpcomingEvents]);

  return (
    <SmallWidgetLayout header="Upcoming Work Order Events">
      <StyledDiv shouldDarkenBG={sortedEvents.length > 0}>
        {sortedEvents.length > 0 ? (
          <List disablePadding>
            {sortedEvents.map(
              ({
                eventDate,
                eventLabel,
                id,
                handleClickListItemBtn,
                description,
                location: { streetLine1 },
              }) => (
                <ListItem
                  key={`WorkOrderUpcomingEventsWidget:${id}:${eventDate.getTime()}`}
                  disablePadding
                >
                  <Paper>
                    <ListItemButton onClick={handleClickListItemBtn}>
                      <ListItemIcon>
                        {/schedule/i.test(eventLabel) ? <ScheduleIcon /> : <EventIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <>
                            <Text>{streetLine1}</Text>
                            {description && <Text>{description}</Text>}
                          </>
                        }
                        secondary={`${eventLabel}: ${eventDate.toLocaleDateString()}`}
                      />
                    </ListItemButton>
                  </Paper>
                </ListItem>
              )
            )}
          </List>
        ) : (
          <EmptyListFallback backgroundIcon={<ConstructionIcon />} text="No Upcoming Events" />
        )}
      </StyledDiv>
    </SmallWidgetLayout>
  );
};

/**
 * To cover edge cases where `sortedEvents.length` > 0, BUT the list only has
 * 1 or 2 items, we need to darken the background of the widget to prevent a
 * gap from showing between the bottom of the last sorted-event and the bottom
 * of the widget.
 */
const StyledDiv = styled("div", {
  shouldForwardProp: (propName) => propName !== "shouldDarkenBG", // don't pass `shouldDarkenBG` to the DOM
})<{ shouldDarkenBG: boolean }>(({ theme: { palette }, shouldDarkenBG }) => ({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto", // allow widget to scroll vertically
  ...(shouldDarkenBG && {
    backgroundColor: darken(palette.background.paper, 0.125),
  }),
  borderWidth: palette.mode === "dark" ? "0" : "1px 0 1px 1px",
  borderStyle: "solid",
  borderColor: palette.divider,

  [`& .${listItemClasses.root}`]: {
    // Ensure the first li doesn't have a top-border
    [`&:first-of-type > .${paperClasses.root}`]: {
      borderWidth: 0,
    },

    [`& > .${paperClasses.root}`]: {
      width: "100%",
      borderRadius: 0,
      borderWidth: palette.mode === "dark" ? "1px 0 0 0" : "1px 0 0 0",
      borderStyle: "solid",
      borderColor: palette.divider,

      // ListItemButton
      [`& > .${listItemButtonClasses.root}`]: {
        // scooch the content down a tad
        paddingTop: "0.55rem",
        paddingBottom: "0.45rem",

        // ListItem icon
        [`& > .${listItemIconClasses.root}`]: {
          minWidth: "unset",
          marginRight: "1rem",
        },

        // ListItem text
        [`& > .${listItemTextClasses.root} .${typographyClasses.root}`]: {
          lineHeight: "1.25rem",
          whiteSpace: "nowrap",
          overflowX: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
}));
