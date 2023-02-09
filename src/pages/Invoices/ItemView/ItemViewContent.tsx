import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import DollarIcon from "@mui/icons-material/Paid";
import InfoIcon from "@mui/icons-material/Info";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  InvoiceStatusChip,
  Avatar,
  ContactAvatar,
  Link,
  ItemDetailsBox,
  ItemDataLabel
} from "@components";
import { prettifyStr, getDate } from "@utils";
import { InvoiceProcessStepper } from "./InvoiceProcessStepper";
import type { Invoice } from "@types";

export const InvoiceItemViewContent = ({
  invoice: { amount, createdBy, assignedTo, status, workOrder, createdAt },
  isItemOwnedByUser
}: {
  invoice: Invoice;
  isItemOwnedByUser: boolean;
}) => (
  <>
    {/* TOP ROW */}

    <Row>
      <ItemDetailsBox
        label="Amount"
        icon={<DollarIcon />}
        sx={(theme) => ({
          // styles applied to "item-details-box-container"
          ...(!theme.variables.isMobilePageLayout
            ? { width: "25%" }
            : { width: "100%", marginBottom: "3rem" }),
          "& > div.item-details-box-content-container": {
            alignItems: "center",
            justifyContent: "center"
          }
        })}
      >
        <Text
          sx={(theme) => ({
            fontSize: "3rem",
            color: theme.palette.mode === "dark" ? "#85BB65" : theme.palette.success.dark
          })}
        >
          {prettifyStr.currency(amount)}
        </Text>
      </ItemDetailsBox>

      {/* TOP ROW - Overview*/}

      <ItemDetailsBox
        label="Overview"
        icon={<InfoIcon />}
        sx={(theme) => ({
          // styles applied to "item-details-box-container"
          width: theme.variables.isMobilePageLayout ? "70%" : "100%",
          "& > div.item-details-box-content-container": {
            justifyContent: "space-between",
            padding: "1.5rem"
          }
        })}
      >
        <OverviewDataBox>
          {/* TODO See if ItemDetailsBox can be used here */}
          <ItemDataLabel>Status</ItemDataLabel>
          <DataValueBox>
            <InvoiceStatusChip status={status} />
          </DataValueBox>
        </OverviewDataBox>

        <OverviewDataBox>
          {/* TODO See if ItemDetailsBox can be used here */}
          <ItemDataLabel>Sender</ItemDataLabel>
          <DataValueBox>
            {isItemOwnedByUser ? (
              <Avatar profile={createdBy.profile} showDisplayName />
            ) : (
              <ContactAvatar contact={createdBy} />
            )}
          </DataValueBox>
        </OverviewDataBox>

        <OverviewDataBox>
          {/* TODO See if ItemDetailsBox can be used here */}
          <ItemDataLabel>Recipient</ItemDataLabel>
          <DataValueBox>
            {isItemOwnedByUser ? (
              <ContactAvatar contact={assignedTo} />
            ) : (
              <Avatar profile={assignedTo.profile} showDisplayName />
            )}
          </DataValueBox>
        </OverviewDataBox>

        <OverviewDataBox>
          {/* TODO See if ItemDetailsBox can be used here */}
          <ItemDataLabel>Work Order</ItemDataLabel>
          <DataValueBox>
            {workOrder ? (
              <Link
                to={`/home/workorders/${workOrder.id}`}
                state={{ isItemOwnedByUser: !isItemOwnedByUser }}
                // NOTE re above: WO ownership will always be the inverse of INV ownership
              >
                View Work Order
              </Link>
            ) : (
              <Text>-</Text>
            )}
          </DataValueBox>
        </OverviewDataBox>

        <OverviewDataBox>
          {/* TODO See if ItemDetailsBox can be used here */}
          <ItemDataLabel>Created</ItemDataLabel>
          <DataValueBox>
            <Text>{getDate(createdAt)}</Text>
          </DataValueBox>
        </OverviewDataBox>
      </ItemDetailsBox>
    </Row>
    <Row>
      <ItemDetailsBox
        label="Status Tracker"
        icon={<TimelineIcon />}
        sx={{
          // styles applied to "item-details-box-container"
          width: "100%",
          "& > div.item-details-box-content-container": {
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem"
          }
        }}
      >
        <div style={{ width: "100%" }}>
          <InvoiceProcessStepper invoiceStatus={status} isItemOwnedByUser={isItemOwnedByUser} />
        </div>
      </ItemDetailsBox>
    </Row>
  </>
);

const Row = styled("div")({
  width: "100%",
  margin: "0 0 3rem 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap"
});

const OverviewDataBox = styled("div")({
  height: "4.25rem",
  padding: "0 1rem"
});

const DataValueBox = styled("div")({
  height: "85%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
});
