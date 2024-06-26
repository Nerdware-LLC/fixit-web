import { Fragment } from "react";
import { styled, alpha } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { StripeBadge, STRIPE_LINKS, brandingClassNames } from "@/components/Branding";
import { APP_PATHS } from "@/routes/appPaths.js";
import { Link } from "./Link.jsx";
import { navigationClassNames } from "./classNames.js";
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
  ...divProps
}: LegalLinksProps) => (
  <StyledDiv
    includeStripeBadge={includeStripeBadge}
    tabIndex={tabIndex}
    className={navigationClassNames.legalLinksRoot}
    {...divProps}
  >
    {includeStripeBadge && (
      <>
        <StripeBadge
          href={STRIPE_LINKS.CONNECT_ACCOUNT_AGREEMENT}
          tooltipProps={{ title: "View Stripe Connected Account Agreement" }}
        />
        <Divider orientation="vertical" />
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
      <Fragment key={label}>
        {!includeStripeBadge && index !== 0 && <Divider orientation="vertical" />}
        <Tooltip title={tooltip}>
          <Link to={link} tabIndex={tabIndex}>
            {`${label} ` /* <-- Don't rm the \s after label, it elongates the underline */}
          </Link>
        </Tooltip>
      </Fragment>
    ))}
  </StyledDiv>
);

const StyledDiv = styled("div")<LegalLinksProps>(({ includeStripeBadge, theme: { palette } }) => ({
  height: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: includeStripeBadge ? "1rem" : "0.75rem",

  [`& .${dividerClasses.root}`]: {
    height: includeStripeBadge ? "2.25rem" : "1.75rem",
    alignSelf: "center",
    backgroundColor: alpha(palette.mode === "dark" ? palette.grey[600] : palette.grey[800], 0.5),
  },

  [`& > a:not(.${brandingClassNames.stripeBadgeAnchor})`]: {
    color: palette.mode === "dark" ? palette.grey[500] : palette.grey[700],
    textDecoration: "underline dotted",
    textUnderlinePosition: "under",
    whiteSpace: "pre", // preserve whitespace, text includes ending space to elongate underline
    transform: "translateY(-1px)", // nudged up bc the underline makes the text appear to not be centered vertically
  },
}));

export type LegalLinksProps = {
  includeStripeBadge?: boolean;
  /**
   * Whether to use the "long" names for the legal links, e.g. "Terms of Service"
   * instead of "Terms" (default: `false`).
   */
  useLongLabels?: boolean;
} & Except<React.ComponentProps<"div">, "className" | "children">;
