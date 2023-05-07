import React, { useMemo } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { avatarClassNames } from "@components/Avatar";
import { getDateAndTime } from "@utils/dateTime";
import { ItemEventIcon, type IconHighlightStyle } from "./ItemEventIcon";

/**
 * Timeline display for events related to WorkOrders, Invoices, Contacts, etc.
 * - Events are sorted so OLDER events appear above NEWER events.
 * - All event timestamps are formatted into "M/D/Y h:mm a".
 */
export const ItemEventsTimeline = ({ events, ...containerProps }: ItemEventsTimelineProps) => {
  const sortedEvents = useMemo(() => {
    return events.sort(({ timestamp: A }, { timestamp: B }) => {
      return dayjs(A).isBefore(B, "second") ? -1 : dayjs(A).isSame(B, "second") ? 0 : 1;
    });
  }, [events]);

  return (
    <StyledDiv className={itemEventsTimelineClassNames.root} {...containerProps}>
      {sortedEvents.map(({ timestamp, icon, iconHighlight, eventInfoContent }) => {
        const [date, time, amOrPm] = (
          timestamp instanceof Date ? getDateAndTime(timestamp) : timestamp
        ).split(" ");

        return (
          <div
            key={`timeline:${timestamp.toString()}`}
            className={itemEventsTimelineClassNames.eventRoot}
          >
            <ItemEventIcon
              iconHighlight={iconHighlight}
              className={itemEventsTimelineClassNames.eventIconContainer}
            >
              {icon}
            </ItemEventIcon>
            <div className={itemEventsTimelineClassNames.eventTimestampContainer}>
              <Text>{date}</Text>
              <Text>{`${time} ${amOrPm}`}</Text>
            </div>
            <div className={itemEventsTimelineClassNames.eventDescriptionContainer}>
              {eventInfoContent}
            </div>
          </div>
        );
      })}
    </StyledDiv>
  );
};

export const itemEventsTimelineClassNames = {
  root: "item-events-timeline-root",
  eventRoot: "item-events-timeline-event-root",
  eventIconContainer: "item-events-timeline-event-icon-container",
  eventTimestampContainer: "item-events-timeline-event-timestamp-container",
  eventDescriptionContainer: "item-events-timeline-event-description-container",
};

const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${itemEventsTimelineClassNames.eventRoot}`]: {
    display: "flex",
    alignItems: "center",
    padding: "0.625rem 0",

    // EVENT TIMESTAMP CONTAINER

    [`& > .${itemEventsTimelineClassNames.eventTimestampContainer}`]: {
      width: "10.5rem",
      margin: "0 1.5rem 0 1rem",
      flexShrink: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      [`& > .${typographyClasses.root}`]: {
        whiteSpace: "nowrap",
      },
    },

    // EVENT DESCRIPTION CONTAINER

    [`& > .${itemEventsTimelineClassNames.eventDescriptionContainer}`]: {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",

      [`& .${avatarClassNames.root}`]: {
        width: "auto",
        flexShrink: 0,
        marginRight: "0.75rem",
      },
    },

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
      overflow: "visible",

      [`& > .${itemEventsTimelineClassNames.eventIconContainer}`]: {
        overflow: "visible",

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-1.25rem",
          left: "calc(50% - 1.5px)",
          display: "block",
          height: "1.25rem",
          width: "3px",
          backgroundColor: theme.palette.info.main,
        },
      },
    },
  },
}));

export type ItemEventsTimelineProps = {
  events: Array<
    {
      timestamp: Date;
      icon: React.ReactNode;
      eventInfoContent: React.ReactNode;
    } & IconHighlightStyle
  >;
} & React.ComponentProps<typeof StyledDiv>;
