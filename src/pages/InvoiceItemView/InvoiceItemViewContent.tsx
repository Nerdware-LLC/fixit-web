import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import DollarIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ContactAvatar } from "@/components/Avatar";
import { InvoiceStatusChip } from "@/components/Chips/InvoiceStatusChip.jsx";
import {
  ItemDetails,
  ItemDetailsGroup,
  InvoiceWorkOrderDetails,
  dataDisplayClassNames,
} from "@/components/DataDisplay";
import { intToCurrencyStr, getDateStr } from "@/utils/formatters";
import { InvoiceStatusTracker } from "./InvoiceStatusTracker.jsx";
import { invoiceItemViewElementIDs } from "./elementIDs.js";
import type { Invoice } from "@/types/graphql.js";

export const InvoiceItemViewContent = ({ invoice }: { invoice: Invoice }) => {
  const { amount, createdBy, assignedTo, status, workOrder, createdAt } = invoice;

  return (
    <StyledDiv>
      <ItemDetailsGroup
        id={invoiceItemViewElementIDs.contentAmountIDG}
        label="Amount"
        labelIcon={<DollarIcon />}
      >
        <Text>{intToCurrencyStr(amount)}</Text>
      </ItemDetailsGroup>

      <ItemDetails gridArea="status" label="Status">
        <InvoiceStatusChip status={status} />
      </ItemDetails>

      <ItemDetails gridArea="createdAt" label="Created">
        {getDateStr(createdAt)}
      </ItemDetails>

      <InvoiceWorkOrderDetails gridArea="work-order" workOrder={workOrder} />

      <ItemDetails gridArea="assignedTo" label="Recipient">
        <ContactAvatar contact={assignedTo} />
      </ItemDetails>

      <ItemDetails gridArea="createdBy" label="Sender">
        <ContactAvatar contact={createdBy} />
      </ItemDetails>

      <ItemDetailsGroup
        id={invoiceItemViewElementIDs.contentStatusTrackerIDG}
        label="Status Tracker"
        labelIcon={<TimelineIcon />}
      >
        <InvoiceStatusTracker invoice={invoice} />
      </ItemDetailsGroup>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette, breakpoints } }) => ({
  display: "grid",
  gridAutoRows: "min-content",

  gap: "2rem 1rem",
  gridTemplateColumns: "minmax(0,0.5fr) repeat(2, 40vw) minmax(0,0.5fr)",
  gridTemplateAreas: `
    "amount          amount          amount          amount"
    ".               createdAt       status          ."
    ".               createdBy       assignedTo      ."
    "work-order      work-order      work-order      work-order"
    "status-tracker  status-tracker  status-tracker  status-tracker"`,

  // WIDEN LAYOUT FOR lg+ VIEWPORTS
  [breakpoints.up("lg")]: {
    gap: "2rem",
    gridTemplateColumns:
      "minmax(min-content,2fr) minmax(8rem,1fr) minmax(8rem,1fr) minmax(min-content,1.5fr)",
    gridTemplateAreas: `
      "amount          status          createdAt       work-order"
      "amount          assignedTo      createdBy       work-order"
      "status-tracker  status-tracker  status-tracker  work-order"`,
  },

  // ItemDetails containers (status, createdAt, createdBy, assignedTo)
  [`& > .${dataDisplayClassNames.root}`]: {
    height: "100%",
    alignSelf: "center",
  },

  // Grid Area: amount
  [`& #${invoiceItemViewElementIDs.contentAmountIDG}`]: {
    gridArea: "amount",
    minWidth: "100%",
    [breakpoints.up("lg")]: { minWidth: "66%" },
    maxWidth: "max-content",

    display: "flex",
    flexDirection: "column",

    // Only show Amount IDG header on lg+ viewports
    [`& > .${dataDisplayClassNames.groupHeader}`]: {
      [breakpoints.down("lg")]: { display: "none" },
    },

    [`& > .${dataDisplayClassNames.groupContent}`]: {
      flexGrow: 1,
      justifyContent: "center",
      // amount text
      [`& > .${typographyClasses.root}`]: {
        minWidth: "min-content",
        alignSelf: "center",
        fontSize: "3rem",
        color: palette.mode === "dark" ? "#85BB65" : palette.text.primary,
      },
    },
  },

  // Grid Area: status-tracker
  [`& #${invoiceItemViewElementIDs.contentStatusTrackerIDG}`]: {
    gridArea: "status-tracker",
    display: "flex",
    flexDirection: "column",
    [`& .${dataDisplayClassNames.groupContent}`]: {
      justifyContent: "center",
      flexGrow: 1,
    },
  },
}));
