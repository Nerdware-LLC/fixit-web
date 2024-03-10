import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import DollarIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ContactAvatar } from "@/components/Avatar/ContactAvatar";
import { InvoiceStatusChip } from "@/components/Chips/InvoiceStatusChip";
import {
  ItemDetails,
  ItemDetailsGroup,
  InvoiceWorkOrderDetails,
  dataDisplayClassNames,
} from "@/components/DataDisplay";
import { fmt } from "@/utils/formatters";
import { InvoiceStatusTracker } from "./InvoiceStatusTracker";
import { invoiceItemViewElementIDs } from "./elementIDs";
import type { Invoice } from "@/graphql/types";

export const InvoiceItemViewContent = ({ invoice }: { invoice: Invoice }) => {
  const { amount, createdBy, assignedTo, status, workOrder, createdAt } = invoice;

  return (
    <StyledDiv>
      <ItemDetailsGroup
        id={invoiceItemViewElementIDs.contentAmountIDG}
        label="Amount"
        labelIcon={<DollarIcon />}
      >
        <Text>{fmt.intToCurrencyStr(amount)}</Text>
      </ItemDetailsGroup>

      <ItemDetails gridArea="status" label="Status">
        <InvoiceStatusChip status={status} />
      </ItemDetails>

      <ItemDetails gridArea="createdAt" label="Created">
        {fmt.getDateStr(createdAt)}
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

const StyledDiv = styled("div")(({ theme: { palette, variables, breakpoints } }) => ({
  display: "grid",
  gridAutoRows: "min-content",
  ...(variables.isMobilePageLayout
    ? {
        gap: "1rem",
        // 0-width col creates 1rem "left-padding" for middle col
        gridTemplateColumns: "0 minmax(0,1fr) minmax(0,1fr)",
        gridTemplateAreas: `
            "amount          amount          amount"
            ".               createdAt       status"
            ".               createdBy       assignedTo"
            ".               work-order      ."
            "status-tracker  status-tracker  status-tracker"`,
      }
    : {
        // Compact layout for smaller viewports
        gap: "1rem",
        gridTemplateColumns:
          "minmax(min-content,2fr) minmax(8rem,1fr) minmax(8rem,1fr) minmax(min-content,1.5fr)",
        gridTemplateAreas: `
            "amount          status          createdAt       work-order"
            "amount          assignedTo      createdBy       work-order"
            "status-tracker  status-tracker  status-tracker  work-order"`,

        [breakpoints.up("lg")]: {
          gridTemplateColumns:
            "minmax(min-content,2fr) 0 minmax(8rem,1fr) minmax(8rem,1fr) minmax(min-content,1.5fr)",
          gridTemplateAreas: `
            "amount          .               status          createdAt       work-order"
            "amount          .               assignedTo      createdBy       work-order"
            "status-tracker  status-tracker  status-tracker  status-tracker  work-order"`,
        },
        [breakpoints.up("xl")]: {
          gap: "3rem",
          gridTemplateColumns:
            "minmax(min-content,2fr) minmax(0,1fr) minmax(8rem,1fr) minmax(8rem,1fr) minmax(min-content,1.5fr)",
        },
      }),

  // ItemDetails containers (status, createdAt, createdBy, assignedTo)
  [`& > .${dataDisplayClassNames.root}`]: {
    height: "min-content",
    ...(!variables.isMobilePageLayout && {
      alignSelf: "center",
    }),
  },

  // Grid Area: amount
  [`& #${invoiceItemViewElementIDs.contentAmountIDG}`]: {
    gridArea: "amount",
    width: variables.isMobilePageLayout ? "100%" : "min-content",
    maxWidth: "calc(100vw - 1rem)",
    display: "flex",
    flexDirection: "column",
    // Hide header on mobile
    [`& > .${dataDisplayClassNames.groupHeader}`]: {
      ...(variables.isMobilePageLayout && {
        display: "none",
      }),
      "& svg": {
        marginRight: "0.5rem",
      },
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
