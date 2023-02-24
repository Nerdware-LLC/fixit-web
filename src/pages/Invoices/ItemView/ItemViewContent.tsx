import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import DollarIcon from "@mui/icons-material/Paid";
import InfoIcon from "@mui/icons-material/Info";
import TimelineIcon from "@mui/icons-material/Timeline";
import { InvoiceStatusChip, ContactAvatar, Link } from "@components";
import { ItemDetails } from "@layouts/CoreItemView";
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
  <InvoiceItemViewContentContainer>
    {/* TOP ROW */}

    <ItemDetails
      label="Amount"
      labelIcon={<DollarIcon />}
      sx={(theme) => ({
        // styles applied to "item-details-container"
        ...(!theme.variables.isMobilePageLayout
          ? { width: "25%" }
          : { width: "100%", marginBottom: "3rem" }),
        "& > div.item-details-content": {
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
    </ItemDetails>

    {/* TOP ROW - Overview */}

    <ItemDetails
      label="Overview"
      labelIcon={<InfoIcon />}
      sx={(theme) => ({
        // styles applied to "item-details-container"
        width: theme.variables.isMobilePageLayout ? "70%" : "100%",
        "& > div.item-details-content": {
          justifyContent: "space-between",
          padding: "1.5rem"
        }
      })}
    >
      <ItemDetails label="Status">
        <InvoiceStatusChip status={status} />
      </ItemDetails>
      <ItemDetails label="Sender">
        <ContactAvatar contact={createdBy} viewContactOnClick={!isItemOwnedByUser} />
      </ItemDetails>
      <ItemDetails label="Recipient">
        <ContactAvatar contact={assignedTo} viewContactOnClick={isItemOwnedByUser} />
      </ItemDetails>
      <ItemDetails label="Work Order">
        {workOrder && (
          <Link
            to={`/home/workorders/${workOrder.id}`}
            state={{ isItemOwnedByUser: !isItemOwnedByUser }}
            // NOTE re above: WO ownership will always be the inverse of INV ownership
          >
            View Work Order
          </Link>
        )}
      </ItemDetails>
      <ItemDetails label="Created">{getDate(createdAt)}</ItemDetails>
    </ItemDetails>

    {/* BOTTOM ROW - Status Tracker */}

    <ItemDetails
      label="Status Tracker"
      labelIcon={<TimelineIcon />}
      sx={{
        // styles applied to "item-details-container"
        width: "100%",
        "& > div.item-details-content": {
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem"
        }
      }}
    >
      <InvoiceProcessStepper invoiceStatus={status} isItemOwnedByUser={isItemOwnedByUser} />
    </ItemDetails>
  </InvoiceItemViewContentContainer>
);

const InvoiceItemViewContentContainer = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  margin: "0 0 3rem 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
  // TODO Until tabs are impl'd, allow x-scroll on mobile
  ...(theme.variables.isMobilePageLayout && { overflowX: "auto" })
}));
