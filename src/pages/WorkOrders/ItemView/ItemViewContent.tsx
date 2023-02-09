import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import {
  OpenGoogleMapsButton,
  Avatar,
  ContactAvatar,
  WorkOrderCategoryChip,
  ItemDetailsBox,
  ItemDataLabel
} from "@components";
import { getDate } from "@utils";
import { WorkOrderTimeline } from "./WorkOrderTimeline";
import { Checklist } from "./Checklist";
import type { WorkOrder } from "@types";

export const WorkOrderItemViewContent = ({
  workOrder,
  isItemOwnedByUser
}: {
  workOrder: WorkOrder;
  isItemOwnedByUser: boolean;
}) => {
  // prettier-ignore
  const { createdBy, assignedTo, status, priority, createdAt, location, category,
    description, checklist, entryContact, entryContactPhone, contractorNotes } = workOrder;

  return (
    <>
      {/* TOP ROW */}

      <ItemDetailsRowWithTwoColumns>
        <ItemDetailsBox
          label="Location"
          icon={<HomeIcon />}
          sx={{
            "& > div.item-details-box-content-container": {
              alignItems: "center"
            },
            "& google-maps-button-icon": {
              fontSize: 45,
              margin: "0.3rem 0.5rem 0 0"
            },
            "& #wo-details-location-text-container .MuiTypography-root": {
              lineHeight: "1.8rem",
              whiteSpace: "nowrap",
              // h6 styles:
              fontSize: "1.25rem",
              fontWeight: 500
            }
          }}
        >
          <OpenGoogleMapsButton location={location} />
          <span id="wo-details-location-text-container">
            <Text>{location.streetLine1}</Text>
            {location.streetLine2 && <Text>{location.streetLine2}</Text>}
            <Text>
              {location.city}, {location.region}
            </Text>
          </span>
        </ItemDetailsBox>

        {/* TOP ROW - Overview*/}

        <ItemDetailsBox
          label="Overview"
          icon={<InfoIcon />}
          sx={{
            "& > div.item-details-box-content-container": {
              justifyContent: "space-between",
              // direct div children of item-details-box-content-container:
              "& > div": {
                height: "4.25rem",
                padding: "0 1rem"
              },
              // direct div GRAND-children of item-details-box-content-container:
              "& > div > div": {
                height: "85%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }
            }
          }}
        >
          <div>
            {/* TODO See if we can use ItemDetailsBox here */}
            <ItemDataLabel>Status</ItemDataLabel>
            <div>
              <Text>{status.replace(/_/g, " ")}</Text>
            </div>
          </div>
          <div>
            {/* TODO See if we can use ItemDetailsBox here */}
            <ItemDataLabel>Priority</ItemDataLabel>
            <div>
              <Text style={{ whiteSpace: "nowrap" }}>
                {priority}
                {priority === "HIGH" && status !== "COMPLETE" && ` ⚠️`}
              </Text>
            </div>
          </div>
          <div>
            {/* TODO See if we can use ItemDetailsBox here */}
            <ItemDataLabel>Assigned To</ItemDataLabel>
            <div>
              {!assignedTo ? (
                <Text>-</Text>
              ) : isItemOwnedByUser ? (
                <ContactAvatar contact={assignedTo} />
              ) : (
                <Avatar profile={assignedTo.profile} showDisplayName />
              )}
            </div>
          </div>
          <div>
            {/* TODO See if we can use ItemDetailsBox here */}
            <ItemDataLabel>Created By</ItemDataLabel>
            <div>
              {isItemOwnedByUser ? (
                <Avatar profile={createdBy.profile} showDisplayName />
              ) : (
                <ContactAvatar contact={createdBy} />
              )}
            </div>
          </div>
          <div>
            {/* TODO See if we can use ItemDetailsBox here */}
            <ItemDataLabel>Created</ItemDataLabel>
            <div>
              <Text>{getDate(createdAt)}</Text>
            </div>
          </div>
        </ItemDetailsBox>
      </ItemDetailsRowWithTwoColumns>

      {/* 2nd ROW */}

      <ItemDetailsRowWithTwoColumns>
        <ItemDetailsBox
          label="Description"
          icon={
            <>
              <DescriptionIcon />
              {category && (
                <WorkOrderCategoryChip category={category} style={{ marginLeft: "auto" }} />
              )}
            </>
          }
        >
          <Text>{description ?? "-"}</Text>
        </ItemDetailsBox>

        {/* 2nd ROW - Timeline */}

        <ItemDetailsBox label="Timeline" icon={<CalendarIcon />}>
          <WorkOrderTimeline workOrder={workOrder} isItemOwnedByUser={isItemOwnedByUser} />
        </ItemDetailsBox>
      </ItemDetailsRowWithTwoColumns>

      {/* 3rd ROW */}

      {checklist && (
        <ItemDetailsRow>
          <Checklist checklist={checklist} />
        </ItemDetailsRow>
      )}

      {/* BOTTOM ROW */}

      <ItemDetailsRowWithTwoColumns>
        <ItemDetailsBox label="Notes" icon={<ChatIcon />}>
          <Text>{contractorNotes ?? "-"}</Text>
        </ItemDetailsBox>
        <ItemDetailsBox label="Entry Contact" icon={<PersonIcon />}>
          <div style={{ minWidth: "5rem", margin: "0 1.5rem 0 0.5rem" }}>
            <ItemDataLabel>Name</ItemDataLabel>
            <Text>{entryContact ?? "-"}</Text>
          </div>
          <div>
            <ItemDataLabel>Phone</ItemDataLabel>
            <Text>{entryContactPhone ?? "-"}</Text>
          </div>
        </ItemDetailsBox>
      </ItemDetailsRowWithTwoColumns>
    </>
  );
};

// TODO See if we can use ItemDetailsBox and nix below styled comps

const ItemDetailsRow = styled("div")({
  width: "100%",
  padding: "0",
  margin: "0 0 3rem 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap"
});

/**
 * Splits `ItemDetailsRow` into 2 columns in large viewports
 */
const ItemDetailsRowWithTwoColumns = styled(ItemDetailsRow)(({ theme }) =>
  theme.variables.isMobilePageLayout
    ? {
        // On mobile, set ItemDetailsBox widths to 100% and add bottom margin to 1st child
        "& > div.item-details-box": { width: "100%" },
        "& > div.item-details-box:first-of-type": { marginBottom: "3rem" },
        // If this IDR is the last of its parent, increase own bottom margin from 3rem to 4
        "div > &:last-of-type": { marginBottom: "4rem" }
      }
    : {
        // On desktop, split row of ItemDetailsBox children into 2 columns
        "& > div.item-details-box:first-of-type": { width: "48%" },
        "& > div.item-details-box:nth-of-type(2)": { width: "49%" },
        // If this IDR is the last of its parent, set own bottom margin to 0
        "div > &:last-of-type": { marginBottom: 0 }
      }
);
