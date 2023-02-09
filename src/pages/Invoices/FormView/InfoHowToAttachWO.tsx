import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Text from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HelpIcon from "@mui/icons-material/HelpOutlineRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const InfoHowToAttachWO = () => (
  <Accordion disableGutters>
    <AccordionSummary
      id="panel1a-header"
      aria-controls="panel1a-content"
      expandIcon={<ExpandMoreIcon />}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <HelpIcon />
        <Text style={{ fontSize: "0.9rem", margin: "0.1rem 0 0 0.5rem" }}>
          How do I attach a Work Order to an Invoice?
        </Text>
      </div>
    </AccordionSummary>
    <AccordionDetails>
      {INSTRUCTIONS.map((text, index) => (
        <React.Fragment key={`InfoHowToAttachWO:AccordionDetails:${index}`}>
          <Divider
            key={`InfoHowToAttachWO:AccordionDetails:Divider:${index}`}
            style={{ margin: index === 0 ? "0 0 0.5rem 0" : "0.5rem 0" }}
          />
          <div
            key={`InfoHowToAttachWO:AccordionDetails:div:${index}`}
            style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CircleContainer>
              <Text>{index + 1}</Text>
            </CircleContainer>
            <Text>{text}</Text>
          </div>
        </React.Fragment>
      ))}
    </AccordionDetails>
  </Accordion>
);

const INSTRUCTIONS = [
  "Click the Work Orders button to view the Work Orders list screen.",
  "From there, click any Work Order that was assigned to you to view its details page.",
  "Then simply click Create Invoice."
];

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  opacity: "0.8"
}));

const CircleContainer = styled("div")(({ theme }) => ({
  margin: "0 1rem 0 0",
  width: "2.5rem",
  minWidth: "2.5rem",
  height: "2.5rem",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
