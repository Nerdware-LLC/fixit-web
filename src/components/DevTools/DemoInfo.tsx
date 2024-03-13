import { Fragment } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Text from "@mui/material/Typography";
import ConstructionIcon from "@mui/icons-material/Construction";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { GitHubLogo } from "@/components/Branding/GitHubLogo";
import { Anchor } from "@/components/Navigation/Anchor";
import { ClickToCopyText } from "@/components/Text/ClickToCopyText";
import { APP_LINKS } from "@/routes/appLinks";
import { DemoInfoListItem } from "./DemoInfoListItem";

export const DemoInfo = () => (
  <Stack spacing="1rem" alignItems="center">
    <Text variant="h6" margin="0.35rem">
      Explore a feature-rich modern SaaS web application.
    </Text>
    <Text color="text.secondary" style={{ fontStyle: "italic" }}>
      This application is for demonstration purposes only.
    </Text>

    <List style={{ padding: 0, borderLeft: "2px dotted rgba(155,155,155,1)" }}>
      {[
        {
          Icon: MoneyOffIcon,
          summary: "Transactions never involve real money.",
          details: (
            <Stack spacing="0.5rem">
              <List
                sx={{
                  padding: "0 0 0 1rem",
                  "& li": {
                    marginTop: "0.25rem",
                    listStyleType: "disc",
                    "& > span": { transform: "translateY(-1px)" },
                  },
                }}
              >
                <li style={{ margin: 0 }}>
                  All Stripe API calls are invoked with{" "}
                  <Anchor href="https://docs.stripe.com/test-mode">test mode keys</Anchor>.
                </li>
                <li>
                  To test one of the payment flows, use the{" "}
                  <Anchor
                    href="https://docs.stripe.com/testing#testing-interactively"
                    style={{ display: "contents" }}
                  >
                    Stripe-provided test card number
                  </Anchor>{" "}
                  in any payment form:{" "}
                  <ul style={{ paddingInlineStart: "1.25rem" }}>
                    <li>
                      For the card number, enter{" "}
                      <ClickToCopyText stripeWhitespace>4242 4242 4242 4242</ClickToCopyText>
                    </li>
                    <li>
                      For the CVC, use any 3 digits, such as <ClickToCopyText>123</ClickToCopyText>
                    </li>
                    <li>
                      For the exp date, use any valid future date, such as{" "}
                      <ClickToCopyText>12/99</ClickToCopyText>
                    </li>
                  </ul>
                </li>
              </List>
              Example:
              <img
                src="https://b.stripecdn.com/docs-statics-srv/assets/test-card.c3f9b3d1a3e8caca3c9f4c9c481fd49c.jpg"
                alt="Stripe test card details"
                style={{
                  boxShadow: "0 0 0.25rem rgba(0,0,0,0.5)",
                  borderRadius: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              />
            </Stack>
          ),
        },
        {
          Icon: GppGoodIcon,
          summary:
            "Advanced encryption and cybersecurity best practices keep user data safe throughout the application.",
          details: (
            <Text>
              Security is always a top priority at every level of the application stack. Even though
              this is a demo application, all user data is securely encrypted, transmitted, and
              stored in accordance with industry standards and best practices.
            </Text>
          ),
        },
        {
          Icon: ConstructionIcon,
          summary: "Dev tools give you the flexibility to explore.",
          details: (
            <Text>
              Feel free to explore the application and find inspiration for your own projects.
            </Text>
          ),
        },
      ].map(({ Icon, summary, details }, index) => (
        <Fragment key={summary}>
          {index !== 0 && (
            <Divider style={{ maxWidth: "calc(100% - 5.5rem)", marginLeft: "auto" }} />
          )}
          <DemoInfoListItem Icon={Icon} summary={summary} details={details} />
        </Fragment>
      ))}
    </List>

    <Anchor href={APP_LINKS.REPO}>
      <Stack direction="row" spacing="0.5rem" alignItems="center">
        <Text>View this project on GitHub</Text>
        <GitHubLogo height="40" alt="Check out the Fixit GitHub repo" />
      </Stack>
    </Anchor>
  </Stack>
);
