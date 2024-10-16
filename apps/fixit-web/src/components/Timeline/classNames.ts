/**
 * Class names for `Timeline` components (src/components/Timeline/).
 */
export const timelineClassNames = {
  root: "timeline-root",
  eventRoot: "timeline-event__root",
  eventIconRoot: "timeline-event__icon-root",
  eventTimestamp: {
    root: "timeline-event__timestamp__root",
    dateText: "timeline-event__timestamp__date-text",
    timeText: "timeline-event__timestamp__time-text",
  },
  eventContentRoot: "timeline-event__content-root",
} as const;
