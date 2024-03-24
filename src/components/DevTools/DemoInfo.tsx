import { Fragment } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack, { type StackProps } from "@mui/material/Stack";
import Text from "@mui/material/Typography";
import ConstructionIcon from "@mui/icons-material/Construction";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { GitHubLogo } from "@/components/Branding/GitHubLogo";
import { Anchor } from "@/components/Navigation/Anchor";
import { APP_LINKS } from "@/routes/appLinks";
import { DemoInfoListItem } from "./DemoInfoListItem";
import { DemoModeStatement } from "./DemoModeStatement";
import { StripeTestCardInfo } from "./StripeTestCardInfo";

export const DemoInfo = ({
  initShowStripeTestCardInfo = false,
  spacing = "1rem",
  alignItems = "center",
  ...stackProps
}: DemoInfoProps = {}) => (
  <Stack spacing={spacing} alignItems={alignItems} {...stackProps}>
    <Text variant="h6" margin="0.35rem" textAlign="center">
      Explore a feature-rich modern SaaS web application.
    </Text>
    <DemoModeStatement variant="long" />
    <List style={{ padding: 0, borderLeft: "2px dotted rgba(155,155,155,1)" }}>
      {[
        {
          Icon: MoneyOffIcon,
          summary: "Transactions never involve real money.",
          isInitiallyOpen: initShowStripeTestCardInfo,
          details: <StripeTestCardInfo />,
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
      ].map(({ Icon, summary, details, isInitiallyOpen = false }, index) => (
        <Fragment key={summary}>
          {index !== 0 && (
            <Divider style={{ maxWidth: "calc(100% - 5.5rem)", marginLeft: "auto" }} />
          )}
          <DemoInfoListItem
            Icon={Icon}
            summary={summary}
            details={details}
            isInitiallyOpen={isInitiallyOpen}
          />
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

export type DemoInfoProps = {
  initShowStripeTestCardInfo?: boolean;
} & Omit<StackProps, "children">;
