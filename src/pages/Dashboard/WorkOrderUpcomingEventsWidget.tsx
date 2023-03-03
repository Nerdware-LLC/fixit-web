import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useDashboardDataContext } from "./DashboardDataContext";
import { SmallWidgetLayout } from "./SmallWidgetLayout";

export const WorkOrderUpcomingEventsWidget = () => {
  const nav = useNavigate();
  const {
    widgetData: { WorkOrderUpcomingEvents }
  } = useDashboardDataContext();

  // prettier-ignore
  const sortedEvents = [
    ...WorkOrderUpcomingEvents.createdByUser.map((wo) => ({
      ...wo,
      handleClickListItemBtn: () => nav(
        `/home/workorders/${encodeURIComponent(wo.id)}`,
        { state: { isItemOwnedByUser: true } }
      )
    })),
    ...WorkOrderUpcomingEvents.assignedToUser.map((wo) => ({
      ...wo,
      handleClickListItemBtn: () => nav(
        `/home/workorders/${encodeURIComponent(wo.id)}`,
        { state: { isItemOwnedByUser: false } }
      )
    }))
    // sort return -1 = put A before B, 1 = put A after B
  ].sort((woA, woB) => (woA.eventDate.getTime() > woB.eventDate.getTime() ? 1 : -1));

  return (
    <SmallWidgetLayout header="Work Orders: Upcoming Events">
      <StyledListContainer className="wo-events-list-container">
        <List disablePadding>
          {sortedEvents.map(
            ({
              eventDate,
              eventLabel,
              id,
              handleClickListItemBtn,
              description,
              location: { streetLine1 }
            }) => (
              <ListItem
                key={`WorkOrderUpcomingEventsWidget:${id}:${eventDate.getTime()}`}
                disablePadding
              >
                <Paper className="wo-upcoming-event-list-item-container">
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
      </StyledListContainer>
    </SmallWidgetLayout>
  );
};

const StyledListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto", // allow widget to scroll vertically
  borderWidth: theme.palette.mode === "dark" ? "0" : "1px 0 1px 1px",
  borderStyle: "solid",
  borderColor: theme.palette.divider,

  "& div.wo-upcoming-event-list-item-container": {
    width: "100%",
    borderRadius: 0,
    borderWidth: theme.palette.mode === "dark" ? "1px 0 0 0" : "1px 0 0 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,

    "& > div.MuiButtonBase-root": {
      // scooch the content down a tad
      paddingTop: "0.55rem",
      paddingBottom: "0.45rem"
    }
  },

  // Ensure the first li doesn't have a top-border
  "& li:first-of-type > *": {
    borderWidth: 0
  },

  // ListItem icon
  "& div.MuiListItemIcon-root": {
    minWidth: "unset",
    marginRight: "1rem"
  },

  // ListItem text
  "& .MuiTypography-root": {
    lineHeight: "1.25rem",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis"
  }
}));
