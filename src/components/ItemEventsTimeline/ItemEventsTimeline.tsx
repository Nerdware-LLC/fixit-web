import React, { useMemo } from "react";
import moment from "moment";
import { styled, type PaletteColor } from "@mui/material/styles";
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

  return (
    <StyledItemEventsTimeline className="item-events-timeline" {...containerProps}>
      {sortedEvents.map(({ timestamp, icon, iconHighlight, eventInfoContent }, index) => {
        const [date, time, amOrPm] = (
          timestamp instanceof Date ? getDateAndTime(timestamp) : timestamp
        ).split(" ");

        return (
          <React.Fragment key={`timeline:${timestamp.toString()}`}>
            <div className="timeline-event-container">
              <IconCircleContainer
                iconHighlight={iconHighlight}
                className="item-event-icon-container"
              >
                {icon}
              </IconCircleContainer>
              <div className="item-event-timestamp-container">
                <Text>{date}</Text>
                <Text>{`${time} ${amOrPm}`}</Text>
              </div>
              <div className="item-event-description">{eventInfoContent}</div>
            </div>
          </React.Fragment>
        );
      })}
    </StyledItemEventsTimeline>
  );
};

const StyledItemEventsTimeline = styled("div")(({ theme }) => ({
  // Outer event container div AND inner content container div
  "& .timeline-event-container": {
    display: "flex",
    alignItems: "center",

    // Event timestamp container
    "& > .item-event-timestamp-container": {
      width: "30%",
      minWidth: "10.5rem",
      margin: "0 1rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      "& > .MuiTypography-root": {
        whiteSpace: "nowrap",
        flexShrink: 0,
        "&:first-of-type": {
          width: "5.5rem"
        },
        "&:last-of-type": {
          width: "5rem",
          textAlign: "right"
        }
      }
    },

    // Inner description container div
    "& > .item-event-description": {
      display: "flex",
      alignItems: "center",
      width: "60%",
      whiteSpace: "nowrap"
    },

    "&:not(:last-of-type)": {
      marginBottom: "1.25rem",
      overflow: "visible",
      "& > .item-event-icon-container": {
        overflow: "visible",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-1.25rem",
          left: "calc(50% - 1.5px)",
          display: "block",
          height: "1.25rem",
          width: "3px",
          backgroundColor: theme.palette.info.main
        }
      }
    }
  }
}));

const IconCircleContainer = styled("div", {
  shouldForwardProp: (propName) => propName !== "iconHighlight" && propName !== "iconColorBase"
})<IconHighlightStyle & { iconColorBase?: PaletteColor }>(
  ({
    theme: { palette },
    iconHighlight = "blue",
    iconColorBase = iconHighlight === "blue" // default blue
      ? palette.info
      : iconHighlight === "yellow"
      ? palette.warning
      : palette.error // else it's red
  }) => ({
    position: "relative",
    width: "2.5rem",
    minWidth: "2.5rem",
    height: "2.5rem",
    margin: "0 1rem",
    display: "inline-flex",
    placeContent: "center",
    placeItems: "center",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${iconColorBase.dark} 40%, ${iconColorBase.light})`,
    overflow: "visible",
    "& svg": {
      // Nudge these icons a little to the right
      "&[data-testid=NoteAddIcon], &[data-testid=UpdateIcon]": {
        marginLeft: "0.1rem"
      }
    }
  })
);

interface IconHighlightStyle {
  iconHighlight?: string | "blue" | "yellow" | "red";
}
