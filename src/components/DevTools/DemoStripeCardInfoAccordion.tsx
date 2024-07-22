import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Anchor } from "@/components/Navigation/Anchor.jsx";
import { NON_BREAKING_HYPHEN_CHAR } from "@/components/Text/constants.js";
import { DemoModeStatement } from "./DemoModeStatement.jsx";
import { StripeTestCardInfo } from "./StripeTestCardInfo.jsx";

export const DemoStripeCardInfoAccordion = () => {
  return (
    <Box
      style={{ borderWidth: "1px", borderStyle: "solid", borderRadius: "0.25rem" }}
      borderColor="warning.main"
    >
      <DemoModeStatement variant="short" invertColor style={{ padding: "1rem" }} />
      <Accordion style={{ marginTop: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="stripe-card-info-summary"
          aria-controls="stripe-card-info-details"
          style={{ gap: "1rem" }}
          sx={({ palette }) => ({ "&:hover": { backgroundColor: palette.action.hover } })}
        >
          <Text style={{ textWrap: "balance" }}>
            Click here to learn how to use the{" "}
            <Anchor href="https://docs.stripe.com/testing#testing-interactively">
              {`Stripe${NON_BREAKING_HYPHEN_CHAR}provided test card number`}
            </Anchor>{" "}
            for testing this payment flow.
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <StripeTestCardInfo />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
