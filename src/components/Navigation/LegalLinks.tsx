import { styled, alpha } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Stack, { type StackProps } from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { StripeBadge, STRIPE_LINKS } from "@/components/Branding";
import { APP_PATHS } from "@/routes/appPaths";
import { Link } from "./Link";
import { navigationClassNames } from "./classNames";
import type { Except } from "type-fest";

/**
 * Legal links:
 * - `Terms`: `"/ToS"`
 * - `Privacy`: `"/privacy"`
 * - `Cookies`: `"/cookie-policy"`
 *
 * If `includeStripeBadge` is true, a vertical divider will be placed in between the
 * StripeBadge and the links; if it is false, the divider will be placed in between
 * the links themselves.
 *
 * When provided, the anchor wrapping the StripeBadge will have an href linking to
 * the Stripe Connected Account Agreement page, rather than Stripe's landing page.
 */
export const LegalLinks = ({
  useLongLabels = false,
  includeStripeBadge = false,
  tabIndex = -1,
  ...containerProps
}: LegalLinksProps) => (
  <StyledStack
    direction="row"
    spacing="0.25rem"
    alignItems="center"
    justifyContent="center"
    tabIndex={tabIndex}
    className={navigationClassNames.legalLinksContainer}
    {...containerProps}
  >
    {includeStripeBadge && (
      <>
        <StripeBadge
          href={STRIPE_LINKS.CONNECT_ACCOUNT_AGREEMENT}
          tooltipProps={{ title: "View Stripe Connected Account Agreement" }}
          anchorProps={{ style: { height: "2rem", margin: "0 0.5rem" } }}
        />
        <Divider
          orientation="vertical"
          variant="middle"
          style={{ height: "2.25rem", margin: "0 0.5rem" }}
        />
      </>
    )}
    {[
      {
        label: useLongLabels ? "Terms of Service" : "Terms",
        tooltip: "View Terms of Service",
        link: APP_PATHS.ToS,
      },
      {
        label: useLongLabels ? "Privacy Policy" : "Privacy",
        tooltip: "View our Privacy Policy",
        link: APP_PATHS.PRIVACY,
      },
      {
        label: useLongLabels ? "Cookie Policy" : "Cookies",
        tooltip: "View our Cookie Policy",
        link: APP_PATHS.COOKIES,
      },
    ].map(({ label, link, tooltip }, index) => (
      <>
        {!includeStripeBadge && index !== 0 && (
          <Divider orientation="vertical" variant="middle" flexItem />
        )}
        <Tooltip key={label} title={tooltip}>
          <Link to={link} tabIndex={tabIndex}>
            {`${label} ` /* <-- Don't rm the \s after label, it elongates the underline */}
          </Link>
        </Tooltip>
      </>
    ))}
  </StyledStack>
);

const StyledStack = styled(Stack)(({ theme: { palette } }) => ({
  [`& .${dividerClasses.root}`]: {
    height: "1.5rem",
    width: "0.1px",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: alpha(palette.mode === "dark" ? palette.grey[600] : palette.grey[800], 0.5),
  },

  [`& > a[href]:not([href='${STRIPE_LINKS.CONNECT_ACCOUNT_AGREEMENT}'])`]: {
    color: palette.mode === "dark" ? palette.grey[500] : palette.grey[700],
    textDecoration: "underline dotted",
    textUnderlinePosition: "under",
    margin: "0 0.5rem",
    whiteSpace: "pre", // preserve whitespace, text includes ending space to elongate underline
  },
}));

export type LegalLinksProps = {
  /**
   * Whether to use the "long" names for the legal links, e.g. "Terms of Service"
   * instead of "Terms" (default: `false`).
   */
  useLongLabels?: boolean;
  includeStripeBadge?: boolean;
} & Except<StackProps, "direction" | "className" | "children">;
