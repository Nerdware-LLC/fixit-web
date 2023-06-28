import dayjs from "dayjs";
import Text from "@mui/material/Typography";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CalendarDateIcon from "@mui/icons-material/InsertInvitation";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import UpdateIcon from "@mui/icons-material/Update";
import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { ItemEventsTimeline } from "@components/ItemEventsTimeline";
import type { WorkOrder } from "@graphql/types";

export const WorkOrderTimeline = ({
  workOrder: { createdBy, status, createdAt, updatedAt, dueDate, scheduledDateTime },
}: {
  workOrder: WorkOrder;
}) => {
  const workOrderEvents = [
    {
      label: "createdAt",
      timestamp: createdAt,
      icon: <NoteAddIcon />,
      eventInfoContent: (
        <>
          <ContactAvatar contact={createdBy} showDisplayName={false} />
          <Text>Work Order created by {createdBy.profile?.displayName ?? createdBy.handle}</Text>
        </>
      ),
    },
    {
      label: "updatedAt",
      timestamp: updatedAt,
      icon: <UpdateIcon />,
      eventInfoContent: <Text>Most recent update</Text>,
    },
    // Check dueDate
    ...(dueDate
      ? [
          {
            label: "dueDate",
            timestamp: dueDate,
            icon: <CalendarDateIcon />,
            ...(status === "COMPLETE"
              ? {
                  // if WO is COMPLETE, no special event formatting
                  eventInfoContent: <Text>Due date</Text>,
                }
              : dayjs(dueDate).isAfter(dayjs())
              ? {
                  // if dueDate has passed, show red "error" event style
                  iconHighlight: "red",
                  eventInfoContent: <Text>Due date (PAST DUE)</Text>,
                }
              : {
                  // else show yellow "warning" event style
                  iconHighlight: "yellow",
                  eventInfoContent: <Text>Due date</Text>,
                }),
          },
        ]
      : []),
    // Check scheduledDateTime
    ...(scheduledDateTime
      ? [
          {
            label: "scheduledDateTime",
            timestamp: scheduledDateTime,
            icon: <HomeRepairServiceIcon />,
            ...(status === "COMPLETE"
              ? {
                  // if WO is COMPLETE, no special event formatting
                  eventInfoContent: <Text>Scheduled arrival</Text>,
                }
              : dayjs(scheduledDateTime).isAfter(dayjs())
              ? {
                  // if scheduledDateTime has passed, show red "error" event style
                  iconHighlight: "red",
                  eventInfoContent: <Text>Scheduled arrival (MISSED APPOINTMENT)</Text>,
                }
              : {
                  // else show yellow "warning" event style
                  iconHighlight: "yellow",
                  eventInfoContent: <Text>Scheduled arrival</Text>,
                }),
          },
        ]
      : []),
  ];

  return <ItemEventsTimeline events={workOrderEvents} />;
};
