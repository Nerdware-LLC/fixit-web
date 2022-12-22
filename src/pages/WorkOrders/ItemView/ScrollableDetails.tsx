import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { OpenGoogleMapsButton, WorkOrderCategoryChip } from "@components";
import { ItemDataDisplay, ItemDataLabel } from "@layouts";
import { getDateTimeObj } from "@utils";
import { Checklist } from "./Checklist";
import type { WorkOrder } from "@types";

export const WorkOrderScrollableDetails = ({
  workOrder: {
    location,
    category,
    description,
    checklist,
    entryContact,
    entryContactPhone,
    dueDate,
    scheduledDateTime,
    contractorNotes
  }
}: {
  workOrder: WorkOrder;
}) => {
  const { date: dueDateDisplay } = dueDate
    ? getDateTimeObj(dueDate, { date: "M/D/Y" })
    : { date: "-" };

  const { date: scheduledDate, time: scheduledTime } = scheduledDateTime
    ? getDateTimeObj(scheduledDateTime, { date: "M/D/Y" })
    : { date: "-", time: "" };

  return (
    <>
      {/* TOP ROW */}
      <Row style={{ alignItems: "center" }}>
        <OpenGoogleMapsButton
          location={location}
          iconProps={{ sx: { fontSize: 45 }, style: { margin: "0.3rem 0.5rem 0 0" } }}
        />
        <span>
          <Text {...locationTextSharedProps}>{location.streetLine1}</Text>
          {location.streetLine2 && <Text {...locationTextSharedProps}>{location.streetLine2}</Text>}
          <Text {...locationTextSharedProps}>
            {location.city}, {location.region}
          </Text>
        </span>
      </Row>

      {/* 2nd ROW */}
      <Row style={{ marginBottom: "0.5rem" }}>
        <ItemDataDisplay label="DUE DATE" styles={{ container: { width: "30%" } }}>
          <Text>{dueDateDisplay}</Text>
        </ItemDataDisplay>
        <ItemDataDisplay label="ENTRY CONTACT" styles={{ container: { width: "30%" } }}>
          <Text>{entryContact ?? "-"}</Text>
        </ItemDataDisplay>
      </Row>

      {/* 3rd ROW */}
      <Row>
        <ItemDataDisplay label="SCHEDULED DATE" styles={{ container: { width: "30%" } }}>
          <Text>
            {
              // prettier-ignore
              [scheduledDate, scheduledTime].join('\n')
            }
          </Text>
        </ItemDataDisplay>
        <ItemDataDisplay label="ENTRY CONTACT PHONE" styles={{ container: { width: "30%" } }}>
          <Text>{entryContactPhone ?? "-"}</Text>
        </ItemDataDisplay>
      </Row>

      {/* 4th ROW */}
      <Row>
        <ItemDataDisplay
          label={
            <>
              <ItemDataLabel style={{ display: "inline-flex", marginRight: "1rem" }}>
                DESCRIPTION
              </ItemDataLabel>
              {category && (
                <WorkOrderCategoryChip category={category} style={{ marginBottom: "0.25rem" }} />
              )}
            </>
          }
        >
          <Text style={{ marginTop: category ? "0.35rem" : "0" }}>{description ?? "-"}</Text>
        </ItemDataDisplay>
      </Row>

      {/* 5th ROW */}
      {checklist && (
        <Row>
          <Checklist checklist={checklist} />
        </Row>
      )}

      {/* BOTTOM ROW */}
      <Row style={{ marginBottom: 0 }}>
        <ItemDataDisplay label="NOTES">
          <Text>{contractorNotes ?? "-"}</Text>
        </ItemDataDisplay>
      </Row>
    </>
  );
};

const Row = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 3rem 0;
  padding: 0;
`;

const locationTextSharedProps: React.ComponentProps<typeof Text> = {
  variant: "h6",
  lineHeight: "1.8rem"
};
