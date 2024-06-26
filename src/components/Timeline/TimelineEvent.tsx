import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text, { typographyClasses } from "@mui/material/Typography";
import { TimelineEventIcon, type TimelineEventIconProps } from "./TimelineEventIcon.jsx";
import { timelineClassNames } from "./classNames.js";
import type { Simplify } from "type-fest";

export const TimelineEvent = ({
  timestamp,
  eventInfoContent,
  icon,
  iconHighlight,
  iconWrapperProps = {},
  ...boxProps
}: TimelineEventProps) => {
  const dayjsTimestamp = dayjs(timestamp);
  const [date, time, amOrPm] = dayjsTimestamp.format("M/D/YYYY h:mm a").split(" ");

  return (
    <StyledBox className={timelineClassNames.eventRoot} {...boxProps}>
      <TimelineEventIcon icon={icon} iconHighlight={iconHighlight} {...iconWrapperProps} />
      <div className={timelineClassNames.eventTimestamp.root}>
        <Text className={timelineClassNames.eventTimestamp.dateText}>{date}</Text>
        <Text className={timelineClassNames.eventTimestamp.timeText}>{`${time} ${amOrPm}`}</Text>
      </div>
      <div className={timelineClassNames.eventContentRoot}>
        {typeof eventInfoContent === "string" ? <Text>{eventInfoContent}</Text> : eventInfoContent}
      </div>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  [`&.${timelineClassNames.eventRoot}`]: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.625rem 0",

    // ALL DESCENDANTS
    "& > *": {
      flexShrink: 0,
      whiteSpace: "nowrap",
    },

    // ALL DIRECT DIV CHILDREN
    "& > div": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "inherit",
    },

    // EVENT TIMESTAMP CONTAINER
    [`& > .${timelineClassNames.eventTimestamp.root}`]: {
      margin: "0 0.5rem 0 0",
      justifyContent: "flex-end",

      [`& > .${typographyClasses.root}`]: {
        textAlign: "right",

        [`&.${timelineClassNames.eventTimestamp.dateText}`]: {
          width: "5.5rem",
          minWidth: "5.5rem",
          maxWidth: "5.5rem",
        },
        [`&.${timelineClassNames.eventTimestamp.timeText}`]: {
          width: "4.5rem",
          minWidth: "4.5rem",
          maxWidth: "4.5rem",
        },
      },
    },

    // EVENT INFO-CONTENT CONTAINER
    [`& > .${timelineClassNames.eventContentRoot}`]: {
      gap: "0.75rem",
    },

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${palette.divider}`,
      overflow: "visible",

      [`& > .${timelineClassNames.eventIconRoot}`]: {
        overflow: "visible",

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-1.25rem",
          left: "calc(50% - 1.5px)",
          display: "block",
          height: "1.25rem",
          width: "3px",
          backgroundColor: palette.info.main,
        },
      },
    },
  },
}));

export type TimelineEventProps = Simplify<
  {
    timestamp: Date;
    eventInfoContent: React.ReactNode;
    iconWrapperProps?: Omit<TimelineEventIconProps, "icon" | "iconHighlight" | "children">;
  } & Pick<TimelineEventIconProps, "icon" | "iconHighlight"> &
    BoxProps
>;
