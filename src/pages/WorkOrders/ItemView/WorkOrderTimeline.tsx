import Text from "@mui/material/Typography";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import UpdateIcon from "@mui/icons-material/Update";
import CalendarDateIcon from "@mui/icons-material/InsertInvitation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { ContactAvatar, ItemEventsTimeline } from "@components";
import type { WorkOrder } from "@types";

export const WorkOrderTimeline = ({
  workOrder: { createdBy, status, createdAt, updatedAt, dueDate, scheduledDateTime },
  isItemOwnedByUser
}: {
  workOrder: WorkOrder;
  isItemOwnedByUser: boolean;
}) => {
  const dueDateDateObj = !dueDate
    ? dueDate
    : typeof dueDate === "number"
    ? new Date(dueDate * 1000)
    : dueDate;

  const scheduledDateTimeObj = !scheduledDateTime
    ? scheduledDateTime
    : typeof scheduledDateTime === "number"
    ? new Date(scheduledDateTime * 1000)
    : scheduledDateTime;

  const workOrderEvents = [
    {
      timestamp: createdAt,
      icon: <NoteAddIcon />,
      eventInfoContent: (
        <>
          <ContactAvatar
            contact={createdBy}
            viewContactOnClick={!isItemOwnedByUser}
            showDisplayName={false}
          />
          <Text>Work Order created by {createdBy.profile.displayName}</Text>
        </>
      )
    },
    {
      timestamp: updatedAt,
      icon: <UpdateIcon />,
      eventInfoContent: <Text>Most recent update</Text>
    },
    // Check dueDate
    ...(dueDateDateObj instanceof Date
      ? [
          {
            timestamp: dueDateDateObj,
            icon: <CalendarDateIcon />,
            ...(status === "COMPLETE"
              ? {
                  // if WO is COMPLETE, no special event formatting
                  eventInfoContent: <Text>Due date</Text>
                }
              : dueDateDateObj.getTime() > Date.now()
              ? {
                  // if dueDate has passed, show red "error" event style
                  iconHighlight: "red",
                  eventInfoContent: <Text>Due date (PAST DUE)</Text>
                }
              : {
                  // else show yellow "warning" event style
                  iconHighlight: "yellow",
                  eventInfoContent: <Text>Due date</Text>
                })
          }
        ]
      : []),
    // Check scheduledDateTime
    ...(scheduledDateTimeObj instanceof Date
      ? [
          {
            timestamp: scheduledDateTimeObj,
            icon: <HomeRepairServiceIcon />,
            ...(status === "COMPLETE"
              ? {
                  // if WO is COMPLETE, no special event formatting
                  eventInfoContent: <Text>Scheduled arrival</Text>
                }
              : scheduledDateTimeObj.getTime() > Date.now()
              ? {
                  // if scheduledDateTime has passed, show red "error" event style
                  iconHighlight: "red",
                  eventInfoContent: <Text>Scheduled arrival (MISSED APPOINTMENT)</Text>
                }
              : {
                  // else show yellow "warning" event style
                  iconHighlight: "yellow",
                  eventInfoContent: <Text>Scheduled arrival</Text>
                })
          }
        ]
      : [])
  ];

  return (
    <ItemEventsTimeline
      events={workOrderEvents}
      sx={{
        "& .avatar-container": {
          width: "auto",
          marginRight: "0.75rem"
        }
      }}
    />
  );
};
