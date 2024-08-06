import dayjs from "dayjs";
import Text from "@mui/material/Typography";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CalendarDateIcon from "@mui/icons-material/InsertInvitation";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import UpdateIcon from "@mui/icons-material/Update";
import { ContactAvatar } from "@/components/Avatar/ContactAvatar.jsx";
import { Timeline, type TimelineEvents } from "@/components/Timeline";
import type { WorkOrder } from "@/types/graphql.js";

export const WorkOrderTimeline = ({
  workOrder: { createdBy, status, createdAt, updatedAt, dueDate, scheduledDateTime },
}: {
  workOrder: WorkOrder;
}) => {
  // Initialize `events` array
  const workOrderTimelineEvents: TimelineEvents = [];

  // Add "createdAt" event
  workOrderTimelineEvents.push({
    timestamp: createdAt,
    icon: <NoteAddIcon style={{ marginLeft: "0.1rem" }} />,
    eventInfoContent: (
      <>
        <ContactAvatar contact={createdBy} showDisplayName={false} />
        <Text>Work Order created by {createdBy.profile.displayName}</Text>
      </>
    ),
  });

  // Add "updatedAt" event
  workOrderTimelineEvents.push({
    timestamp: updatedAt,
    eventInfoContent: "Most recent update",
    icon: <UpdateIcon style={{ marginLeft: "0.1rem" }} />,
  });

  // Check "dueDate"
  if (dueDate) {
    // Ascertain if the event is past due
    const isPastDue = status === "ASSIGNED" && dayjs(dueDate).isBefore(dayjs());

    // Add "dueDate" event
    workOrderTimelineEvents.push({
      timestamp: dueDate,
      eventInfoContent: isPastDue ? "Due date (PAST DUE)" : "Due date",
      icon: <CalendarDateIcon />,
      iconHighlight:
        status === "ASSIGNED"
          ? isPastDue
            ? "red"
            : "yellow"
          : status === "IN_PROGRESS"
            ? "green"
            : "blue",
    });
  }

  // Check "scheduledDateTime"
  if (scheduledDateTime) {
    // Add "scheduledDateTime" event
    workOrderTimelineEvents.push({
      timestamp: scheduledDateTime,
      eventInfoContent: "Scheduled arrival",
      icon: <HomeRepairServiceIcon />,
      iconHighlight: status === "ASSIGNED" ? "yellow" : status === "IN_PROGRESS" ? "green" : "blue",
    });
  }

  return <Timeline events={workOrderTimelineEvents} />;
};
