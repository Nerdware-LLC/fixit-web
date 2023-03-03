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
  events,
  ...containerProps
}: {
  events: Array<
    {
      timestamp: Date;
      icon: React.ReactNode;
      eventInfoContent: React.ReactNode;
    } & IconHighlightStyle
  >;
} & React.ComponentProps<typeof StyledItemEventsTimeline>) => {
  const sortedEvents = useMemo(() => {
    return events.sort(({ timestamp: A }, { timestamp: B }) => {
      return moment(A).isBefore(B, "second") ? -1 : moment(A).isSame(B, "second") ? 0 : 1;
    });
  }, [events]);

  const numEvents = events.length;
  const indexOfLastEvent = numEvents - 1;

  return (
    <StyledItemEventsTimeline className="item-events-timeline" {...containerProps}>
      {sortedEvents.map(({ timestamp, icon, iconHighlight, eventInfoContent }, index) => (
        <React.Fragment key={`timeline:${timestamp.toString()}`}>
          <div className="timeline-event-container">
            <IconCircleContainer iconHighlight={iconHighlight}>{icon}</IconCircleContainer>
            <div className="item-event-timestamp-container">
              <Text className="item-event-timestamp">
                {timestamp instanceof Date ? getDateAndTime(timestamp) : timestamp}
              </Text>
            </div>
            <div className="timeline-event-container timeline-event-content">
              {eventInfoContent}
            </div>
          </div>
          {index !== indexOfLastEvent && <div className="timeline-event-icons-connector" />}
        </React.Fragment>
      ))}
    </StyledItemEventsTimeline>
  );
};

const StyledItemEventsTimeline = styled("div")(({ theme }) => ({
  // Outer event container div AND inner content container div
  "& .timeline-event-container": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  // Event timestamp container
  "& .item-event-timestamp-container": {
    width: "30%",
    minWidth: "10.5rem",
    margin: "0 1rem",
    "& > .MuiTypography-root": {
      whiteSpace: "nowrap"
    }
  },

  // Inner content container div
  "& .timeline-event-content": {
    width: "60%",
    whiteSpace: "nowrap"
  },

  // The connector for event icons
  "& .timeline-event-icons-connector": {
    height: "1.25rem",
    width: "3px",
    marginLeft: "2.15rem",
    background: theme.palette.info.main
  }
}));

const IconCircleContainer = styled("div", {
  shouldForwardProp: (propName) => propName !== "iconHighlight"
})<IconHighlightStyle>(({ theme, iconHighlight = "blue" }) => ({
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
}));

interface IconHighlightStyle {
  iconHighlight?: string | "blue" | "yellow" | "red";
}
