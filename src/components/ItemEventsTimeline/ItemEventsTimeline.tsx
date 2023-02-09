import React, { useMemo } from "react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { getDateAndTime } from "@utils";

/**
 * Timeline display for events related to WorkOrders, Invoices, Contacts, etc.
 * - Events are sorted so OLDER events appear above NEWER events.
 * - All event timestamps are formatted into "M/D/Y h:mm a".
 */
export const ItemEventsTimeline = ({
  events
}: {
  events: Array<
    {
      timestamp: Date;
      icon: React.ReactNode;
      eventInfoContent: React.ReactNode;
    } & IconHighlightStyle
  >;
}) => {
  const sortedEvents = useMemo(() => {
    return events.sort(({ timestamp: A }, { timestamp: B }) => {
      return moment(A).isBefore(B, "second") ? -1 : moment(A).isSame(B, "second") ? 0 : 1;
    });
  }, [events]);

  const numEvents = events.length;
  const indexOfLastEvent = numEvents - 1;

  return (
    <div>
      {sortedEvents.map(({ timestamp, icon, iconHighlight, eventInfoContent }, index) => (
        <React.Fragment key={`ItemEventsTimeline:${timestamp.toString()}`}>
          <EventContainer key={`ItemEventsTimeline:EventContainer:${timestamp.toString()}`}>
            <IconCircleContainer iconHighlight={iconHighlight}>{icon}</IconCircleContainer>
            <div style={{ width: "30%", minWidth: "10.5rem", margin: "0 1rem" }}>
              <Text style={{ whiteSpace: "nowrap" }}>
                {timestamp instanceof Date ? getDateAndTime(timestamp) : timestamp}
              </Text>
            </div>
            <EventContentContainer>{eventInfoContent}</EventContentContainer>
          </EventContainer>
          {index !== indexOfLastEvent && (
            <CircleContainerConnector
              key={`ItemEventsTimeline:CircleContainerConnector:${timestamp.toString()}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const EventContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start"
}));

interface IconHighlightStyle {
  iconHighlight?: string | "blue" | "yellow" | "red";
}

const IconCircleContainer = styled("div")<IconHighlightStyle>(
  ({ theme, iconHighlight = "blue" }) => ({
    margin: "0 1rem",
    width: "2.5rem",
    minWidth: "2.5rem",
    height: "2.5rem",
    paddingLeft: "0.1rem",
    borderRadius: "50%",
    background:
      iconHighlight === "blue"
        ? `linear-gradient(135deg, ${theme.palette.info.dark} 40%, ${theme.palette.info.light})`
        : iconHighlight === "yellow"
        ? `linear-gradient(135deg, ${theme.palette.warning.dark} 40%, ${theme.palette.warning.light})`
        : // else it's "red"
          `linear-gradient(135deg, ${theme.palette.error.dark} 40%, ${theme.palette.error.light})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  })
);

const CircleContainerConnector = styled("div")(({ theme }) => ({
  height: "1.25rem",
  width: "3px",
  marginLeft: "2.15rem",
  background: theme.palette.info.main
}));

const EventContentContainer = styled(EventContainer)(() => ({
  width: "60%",
  whiteSpace: "nowrap"
}));
