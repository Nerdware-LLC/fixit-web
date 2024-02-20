import { useMemo } from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { TimelineEvent, type TimelineEventProps } from "./TimelineEvent";
import { timelineClassNames } from "./classNames";

/**
 * Timeline display for events.
 *
 * - Events are sorted so OLDER events appear above NEWER events.
 * - All event timestamps are formatted into `"M/D/Y h:mm a"`.
 */
export const Timeline = ({ events, ...boxProps }: TimelineProps) => {
  const sortedEvents = useMemo(() => {
    return events.sort(({ timestamp: A }, { timestamp: B }) => {
      // prettier-ignore
      return dayjs(A).isBefore(B, "second")
        ? -1
        : dayjs(A).isSame(B, "second")
        ? 0
        : 1;
    });
  }, [events]);

  return (
    <StyledBox className={timelineClassNames.root} {...boxProps}>
      {sortedEvents.map(({ timestamp, ...timelineEventProps }) => (
        <TimelineEvent
          key={`TimelineEvent:${timestamp.toISOString()}`}
          timestamp={timestamp}
          {...timelineEventProps}
        />
      ))}
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  flexShrink: 0,
});

export type TimelineProps = {
  events: TimelineEvents;
} & BoxProps;

export type TimelineEvents = Array<TimelineEventProps>;
