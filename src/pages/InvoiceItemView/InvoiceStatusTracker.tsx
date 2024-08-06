import Text from "@mui/material/Typography";
import DollarSignIcon from "@mui/icons-material/AttachMoney";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { INVOICE_STATUS_ICONS_JSX } from "@/components/Icons/InvoiceStatusIcon.jsx";
import { Stepper, type StepperProps, type StepperStepConfig } from "@/components/Stepper";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { getDateAndTimeStr } from "@/utils/formatters/dateTime.js";
import { PayInvoiceButton } from "./PayInvoiceButton.jsx";
import type { Invoice } from "@/types/graphql.js";

export const InvoiceStatusTracker = ({ invoice }: { invoice: Invoice }) => {
  const { isMobilePageLayout } = usePageLayoutContext();
  const authenticatedUser = authenticatedUserStore.useSubToStore();

  const isItemOwnedByUser = invoice.createdBy.id === authenticatedUser?.id;

  const statusStepConstants = isItemOwnedByUser
    ? INVOICE_STATUS_STEP_CONSTANTS.SENDER
    : INVOICE_STATUS_STEP_CONSTANTS.RECEIVER;

  const steps: StepperProps["steps"] = [
    // Step 1: Invoice created
    {
      ...statusStepConstants.INVOICE_CREATED,
      caption: getDateAndTimeStr(invoice.createdAt),
    },

    // Step 2: OPEN/DISPUTED
    invoice.status !== "DISPUTED"
      ? {
          ...statusStepConstants.OPEN,
          ...(invoice.status === "OPEN" && {
            ...(isItemOwnedByUser
              ? {
                  label: "Awaiting Payment",
                  caption: `Status: OPEN\nUpdated: ${getDateAndTimeStr(invoice.updatedAt)}`,
                }
              : {
                  caption: "Status: OPEN",
                  content: {
                    ...(statusStepConstants.OPEN.content ?? {}),
                    ...(!!authenticatedUser && {
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
                    }),
                  },
                }),
          }),
        }
      : {
          ...statusStepConstants.DISPUTED,
          caption: `Status: DISPUTED\nUpdated: ${getDateAndTimeStr(invoice.updatedAt)}`,
          showErrorStyling: true,
        },

    // Step 3: Invoice closed
    {
      ...statusStepConstants.CLOSED,
      ...(invoice.status === "CLOSED" && {
        caption: getDateAndTimeStr(invoice.updatedAt), // IDEA Use Invoice `paidDate` when implemented
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
    INVOICE_CREATED: INVOICE_STATUS_ICONS_JSX.OPEN,
    OPEN: <DollarSignIcon />,
    CLOSED: INVOICE_STATUS_ICONS_JSX.CLOSED,
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
        /* IDEA Add more text, and maybe a link to more info or an action btn to contact the
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
