import Text from "@mui/material/Typography";
import DollarSignIcon from "@mui/icons-material/AttachMoney";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { INV_STATUS_ICON_REACT_NODES } from "@components/Icons/InvoiceStatusIcon";
import { Stepper, type StepperProps, type StepperStepConfig } from "@components/Stepper";
import { getDateAndTime } from "@utils/dateTime";
import { PayInvoiceButton } from "./PayInvoiceButton";
import type { Invoice } from "@graphql/types";

export const InvoiceStatusTracker = ({
  invoice,
  isItemOwnedByUser,
}: {
  invoice: Invoice;
  isItemOwnedByUser: boolean;
}) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  const statusStepConstants = isItemOwnedByUser
    ? INVOICE_STATUS_STEP_CONSTANTS.SENDER
    : INVOICE_STATUS_STEP_CONSTANTS.RECEIVER;

  const steps: StepperProps["steps"] = [
    // Step 1: Invoice created
    {
      ...statusStepConstants.INVOICE_CREATED,
      caption: getDateAndTime(invoice.createdAt),
    },

    // Step 2: OPEN/DISPUTED
    invoice.status !== "DISPUTED"
      ? {
          ...statusStepConstants.OPEN,
          ...(invoice.status === "OPEN" && {
            ...(isItemOwnedByUser
              ? {
                  label: "Awaiting Payment",
                  caption: `Status: OPEN\nUpdated: ${getDateAndTime(invoice.updatedAt)}`,
                }
              : {
                  caption: "Status: OPEN",
                  content: {
                    ...(statusStepConstants.OPEN?.content ?? {}),
                    stepActionButtons: (
                      <PayInvoiceButton
                        invoice={invoice}
                        variant="outlined"
                        sx={{
                          "& .MuiButton-startIcon": {
                            display: "none",
                          },
                        }}
                      />
                    ),
                  },
                }),
          }),
        }
      : {
          ...statusStepConstants.DISPUTED,
          caption: `Status: DISPUTED\nUpdated: ${getDateAndTime(invoice.updatedAt)}`,
          showErrorStyling: true,
        },

    // Step 3: Invoice closed
    {
      ...statusStepConstants.CLOSED,
      ...(invoice.status === "CLOSED" && {
        /* TODO Once Invoice has paymentDate/paidDate/paidInFullDate/closedDate
        or whatever, change below caption to use that value instead.  */
        caption: getDateAndTime(invoice.updatedAt),
      }),
    },
  ];

  return (
    <Stepper
      steps={steps}
      activeStepIndex={invoice.status === "CLOSED" ? 3 : 1}
      useVerticalOrientation={isMobilePageLayout}
    />
  );
};

const STATUS_STEP_LABEL_PROPS = Object.fromEntries(
  Object.entries({
    INVOICE_CREATED: INV_STATUS_ICON_REACT_NODES.OPEN,
    OPEN: <DollarSignIcon />,
    CLOSED: INV_STATUS_ICON_REACT_NODES.CLOSED,
  }).map(([stepName, stepIconNode]) => [
    stepName,
    {
      stepLabelProps: {
        StepIconProps: {
          icon: stepIconNode,
        },
      },
    },
  ])
) as Record<InvoiceStatusTrackerStepNames, Pick<StepperStepConfig, "stepLabelProps">>;

const INVOICE_STATUS_STEP_CONSTANTS: Record<
  "SENDER" | "RECEIVER",
  Record<InvoiceStatusTrackerStepNames, StepperStepConfig>
> = {
  SENDER: {
    INVOICE_CREATED: {
      label: "Invoice Submitted",
      ...STATUS_STEP_LABEL_PROPS.INVOICE_CREATED,
    },
    OPEN: {
      label: "Invoice Payment",
      content: {
        description: "You will be notified when payment has been submitted.",
      },
      ...STATUS_STEP_LABEL_PROPS.OPEN,
    },
    DISPUTED: {
      label: "Recipient Declined Payment Request",
      content: {
        description: "Your payment request was denied.",
        /* TODO Add more text, and maybe a link to more info or an action btn to contact the
        user who disputed/rejected their payment request; something to offer recourse.  */
      },
    },
    CLOSED: {
      label: "Payment Received",
      ...STATUS_STEP_LABEL_PROPS.CLOSED,
    },
  },
  RECEIVER: {
    INVOICE_CREATED: {
      label: "Invoice Received",
      ...STATUS_STEP_LABEL_PROPS.INVOICE_CREATED,
    },
    OPEN: {
      label: "Invoice is Payable",
      content: {
        description: (
          <Text
            sx={({ palette }) => ({
              "& > span": {
                color: palette.mode === "dark" ? palette.primary.light : palette.primary.main,
              },
            })}
          >
            Click <span>Pay Invoice</span> to submit payment.
          </Text>
        ),
      },
      ...STATUS_STEP_LABEL_PROPS.OPEN,
    },
    DISPUTED: {
      label: "Payment Request Declined",
      content: {
        description: "You declined the payment request.",
      },
    },
    CLOSED: {
      label: "Invoice Closed",
      ...STATUS_STEP_LABEL_PROPS.CLOSED,
    },
  },
};

type InvoiceStatusTrackerStepNames = "INVOICE_CREATED" | Invoice["status"];
