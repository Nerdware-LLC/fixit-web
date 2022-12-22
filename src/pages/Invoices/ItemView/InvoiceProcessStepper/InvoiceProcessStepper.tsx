import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Stack from "@mui/material/Stack";
import Text from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { PrettyStepConnector } from "./PrettyStepConnector";
import { PrettyStepIcon } from "./PrettyStepIcon";
import { PrettyStepLabel } from "./PrettyStepLabel";
import type { Invoice } from "@types";

export const InvoiceProcessStepper = ({
  invoiceStatus,
  isItemOwnedByUser
}: {
  invoiceStatus: Invoice["status"];
  isItemOwnedByUser: boolean;
}) => {
  const steps = isItemOwnedByUser
    ? [...INVOICE_PROCESS_STEPS.SENDER]
    : [...INVOICE_PROCESS_STEPS.RECEIVER];

  const activeStep = invoiceStatus === "OPEN" ? 1 : invoiceStatus === "DISPUTED" ? 2 : 3;

  // Handle Invoice status "DISPUTED" (recipient rejected payment request)
  if (invoiceStatus === "DISPUTED") {
    steps[2] = isItemOwnedByUser ? INVOICE_DISPUTED_STEPS.SENDER : INVOICE_DISPUTED_STEPS.RECEIVER;
  }

  return (
    <Stepper
      activeStep={activeStep}
      connector={
        <PrettyStepConnector showerrorstyling={invoiceStatus === "DISPUTED" ? "yes" : "no"} />
      }
      alternativeLabel
    >
      {steps.map(({ label, caption, description, showErrorStyling = false }, index) => (
        <Step key={label}>
          <PrettyStepLabel
            StepIconComponent={PrettyStepIcon}
            error={showErrorStyling}
            optional={
              index === activeStep && (
                <Text variant="caption" color="gray">
                  {caption}
                </Text>
              )
            }
          >
            {label}
          </PrettyStepLabel>
          {index === activeStep && !!description && (
            <Stack direction="row" alignItems="center" spacing={2} style={{ marginTop: "3rem" }}>
              <InfoIcon style={{ display: "inline-flex" }} />
              <Text>{description}</Text>
            </Stack>
          )}
        </Step>
      ))}
    </Stepper>
  );
};

const INVOICE_PROCESS_STEPS: Record<InvoiceParticipantLabel, Array<MuiStepInput>> = {
  SENDER: [
    { label: "Submit Invoice", caption: "Status: OPEN" },
    {
      label: "Awaiting Payment",
      caption: "Status: OPEN",
      description: "You will be notified when payment has been submitted."
    },
    { label: "Payment Received", caption: "Status: CLOSED" }
  ],
  RECEIVER: [
    { label: "Invoice Received", caption: "Status: OPEN" },
    { label: "Pay Invoice", caption: "Status: OPEN" },
    { label: "Payment Submitted", caption: "Status: CLOSED" }
  ]
};

const INVOICE_DISPUTED_STEPS: Record<InvoiceParticipantLabel, MuiStepInput> = {
  SENDER: {
    label: "Recipient Declined Payment Request",
    caption: "Status: DISPUTED",
    showErrorStyling: true
  },
  RECEIVER: {
    label: "Payment Request Declined",
    caption: "Status: DISPUTED",
    showErrorStyling: true
  }
};

type InvoiceParticipantLabel = "SENDER" | "RECEIVER";
type MuiStepInput = {
  label: string;
  caption: string;
  description?: string;
  showErrorStyling?: boolean;
};
