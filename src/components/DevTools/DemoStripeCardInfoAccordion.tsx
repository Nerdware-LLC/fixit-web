import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Anchor } from "@/components/Navigation/Anchor";
import { DemoModeStatement } from "./DemoModeStatement";
import { StripeTestCardInfo } from "./StripeTestCardInfo";

export const DemoStripeCardInfoAccordion = () => {
  return (
    <Box
      sx={({ palette }) => ({
        border: `1px solid ${palette.warning.main}`,
        borderRadius: "0.25rem",
      })}
    >
      <DemoModeStatement
        variant="short"
        sx={({ palette }) => ({
          padding: "1rem",
          justifyContent: "flex-start",
          backgroundColor: palette.warning.main,
          "& *": {
            color: palette.getContrastText(palette.warning.main),
          },
        })}
      />
      <Accordion style={{ marginTop: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="stripe-card-info-summary"
          aria-controls="stripe-card-info-details"
          sx={({ palette }) => ({
            gap: "1rem",
            "&:hover": {
              backgroundColor: palette.action.hover,
            },
          })}
        >
          <Text style={{ whiteSpace: "pre-line" }}>
            Click here to learn how to use the{" "}
            <Anchor
              href="https://docs.stripe.com/testing#testing-interactively"
              style={{ display: "contents" }}
            >
              {`Stripe-provided\ntest card number`}
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
