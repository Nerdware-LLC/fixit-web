import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import DollarIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { InvoiceStatusChip } from "@components/Chips/InvoiceStatusChip";
import { ItemDetails } from "@components/DataDisplay/ItemDetails";
import { ItemDetailsGroup } from "@components/DataDisplay/ItemDetailsGroup";
import { itemDetailsClassNames } from "@components/DataDisplay/classNames";
import { getDate } from "@utils/dateTime";
import { prettifyStr } from "@utils/prettifyStr";
import { InvoiceStatusTracker } from "./InvoiceStatusTracker";
import { InvoiceWorkOrderInfo } from "../InvoiceWorkOrderInfo";
import type { Invoice } from "@graphql/types";

export const InvoiceItemViewContent = ({
  invoice,
  isItemOwnedByUser: isInvoiceOwnedByUser,
}: {
  invoice: Invoice;
  isItemOwnedByUser: boolean;
}) => {
  const { amount, createdBy, assignedTo, status, workOrder, createdAt } = invoice;

  return (
    <InvoiceItemViewContentContainer>
      <ItemDetailsGroup id={ELEMENT_IDs.amountIDG} label="Amount" labelIcon={<DollarIcon />}>
        <Text>{prettifyStr.currency(amount)}</Text>
      </ItemDetailsGroup>

      <ItemDetails gridArea="status" label="Status">
        <InvoiceStatusChip status={status} />
      </ItemDetails>

      <ItemDetails gridArea="createdAt" label="Created">
        {getDate(createdAt)}
      </ItemDetails>

      <InvoiceWorkOrderInfo
        gridArea="work-order"
        workOrder={workOrder}
        isWorkOrderOwnedByUser={!isInvoiceOwnedByUser}
      />

      <ItemDetails gridArea="assignedTo" label="Recipient">
        <ContactAvatar contact={assignedTo} viewContactOnClick={isInvoiceOwnedByUser} />
      </ItemDetails>

      <ItemDetails gridArea="createdBy" label="Sender">
        <ContactAvatar contact={createdBy} viewContactOnClick={!isInvoiceOwnedByUser} />
      </ItemDetails>

      <ItemDetailsGroup
        id={ELEMENT_IDs.statusTrackerIDG}
        label="Status Tracker"
        labelIcon={<TimelineIcon />}
      >
        <InvoiceStatusTracker invoice={invoice} isItemOwnedByUser={isInvoiceOwnedByUser} />
      </ItemDetailsGroup>
    </InvoiceItemViewContentContainer>
  );
};

const ELEMENT_IDs = {
  amountIDG: "amount-item-details-group",
  statusTrackerIDG: "status-tracker-item-details-group",
};

const InvoiceItemViewContentContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridAutoRows: "min-content",
  ...(theme.variables.isMobilePageLayout
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

        [theme.breakpoints.up("lg")]: {
          gridTemplateColumns:
            "minmax(min-content,2fr) 0 minmax(8rem,1fr) minmax(8rem,1fr) minmax(min-content,1.5fr)",
          gridTemplateAreas: `
            "amount          .               status          createdAt       work-order"
            "amount          .               assignedTo      createdBy       work-order"
            "status-tracker  status-tracker  status-tracker  status-tracker  work-order"`,
        },
        [theme.breakpoints.up("xl")]: {
          gap: "3rem",
          gridTemplateColumns:
            "minmax(min-content,2fr) minmax(0,1fr) minmax(8rem,1fr) minmax(8rem,1fr) minmax(min-content,1.5fr)",
        },
      }),

  // ItemDetails containers (status, createdAt, createdBy, assignedTo)
  [`& > .${itemDetailsClassNames.container}`]: {
    height: "min-content",
    ...(!theme.variables.isMobilePageLayout && {
      alignSelf: "center",
    }),
  },

  // Grid Area: amount
  [`& #${ELEMENT_IDs.amountIDG}`]: {
    gridArea: "amount",
    width: theme.variables.isMobilePageLayout ? "100%" : "min-content",
    maxWidth: "calc(100vw - 1rem)",
    display: "flex",
    flexDirection: "column",
    // Hide header on mobile
    [`& > .${itemDetailsClassNames.groupHeader}`]: {
      ...(theme.variables.isMobilePageLayout && {
        display: "none",
      }),
      "& svg": {
        marginRight: "0.5rem",
      },
    },
    [`& > .${itemDetailsClassNames.groupContent}`]: {
      flexGrow: 1,
      justifyContent: "center",
      // amount text
      [`& > .${typographyClasses.root}`]: {
        minWidth: "min-content",
        alignSelf: "center",
        fontSize: "3rem",
        color: theme.palette.mode === "dark" ? "#85BB65" : theme.palette.text.primary,
      },
    },
  },

  // Grid Area: status-tracker
  [`& #${ELEMENT_IDs.statusTrackerIDG}`]: {
    gridArea: "status-tracker",
    display: "flex",
    flexDirection: "column",
    [`& .${itemDetailsClassNames.groupContent}`]: {
      justifyContent: "center",
      flexGrow: 1,
    },
  },
}));
