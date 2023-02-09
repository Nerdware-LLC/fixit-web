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

  const activeStep = invoiceStatus === "OPEN" ? 1 : invoiceStatus === "DISPUTED" ? 1 : 3;

  // Handle Invoice status "DISPUTED" (recipient rejected payment request)
  if (invoiceStatus === "DISPUTED") {
    steps[1] = isItemOwnedByUser ? INVOICE_DISPUTED_STEPS.SENDER : INVOICE_DISPUTED_STEPS.RECEIVER;
  }

  return (
    <>
      <Stepper
        activeStep={activeStep}
        connector={<PrettyStepConnector showerrorstyling={`${invoiceStatus === "DISPUTED"}`} />}
        alternativeLabel
      >
        {steps.map(({ label, caption, showErrorStyling = false }, index) => (
          <Step key={label}>
            <PrettyStepLabel
              StepIconComponent={PrettyStepIcon}
              error={showErrorStyling}
              style={{ whiteSpace: "nowrap" }}
              optional={
                index === activeStep && (
                  <Text variant="caption" color="gray">
                    {caption}
                  </Text>
                )
              }
            >
              {label}
              {index < activeStep && ` ✅`}
            </PrettyStepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep]?.description && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          style={{ margin: "3rem 0 -1rem 0" }}
        >
          <InfoIcon style={{ display: "inline-flex" }} />
          <Text>{steps[activeStep].description}</Text>
        </Stack>
      )}
    </>
  );
};

const INVOICE_PROCESS_STEPS: Record<InvoiceParticipantLabel, Array<MuiStepInput>> = {
  SENDER: [
    { label: "Invoice Submitted", caption: "Status: OPEN" },
    {
      label: "Awaiting Payment",
      caption: "Status: OPEN",
      description: "You will be notified when payment has been submitted."
    },
    { label: "Payment Received", caption: "Status: CLOSED" }
  ],
  RECEIVER: [
    { label: "Invoice Received", caption: "Status: OPEN" },
    {
      label: "Pay Invoice",
      caption: "Status: OPEN",
      description: `Click "Pay Invoice" to submit payment.`
    },
    { label: "Invoice Closed", caption: "Status: CLOSED" }
  ]
};

const INVOICE_DISPUTED_STEPS: Record<InvoiceParticipantLabel, MuiStepInput> = {
  SENDER: {
    label: "Recipient Declined Payment Request",
    caption: "Status: DISPUTED",
    description: "Your payment request was denied.",
    showErrorStyling: true
  },
  RECEIVER: {
    label: "Payment Request Declined",
    caption: "Status: DISPUTED",
    description: "You declined the payment request.",
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
