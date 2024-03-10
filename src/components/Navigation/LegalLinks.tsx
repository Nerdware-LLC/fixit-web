import { styled, alpha } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { StripeBadge, brandingClassNames } from "@/components/Branding";
import { APP_PATHS } from "@/routes/appPaths";
import { Link } from "./Link";
import { navigationClassNames } from "./classNames";

/**
 * Legal links:
 * - `Terms`: `"/ToS"`
 * - `Privacy`: `"/privacy"`
 *
 * If `includeStripeBadge` is true, a vertical divider will be placed in between the
 * StripeBadge and the links; if it is false, the divider will be placed in between
 * the links themselves.
 *
 * When provided, the anchor wrapping the StripeBadge will have an href linking to
 * the Stripe Connected Account Agreement page, rather than Stripe's landing page.
 */
export const LegalLinks = ({
  includeStripeBadge = false,
  tabIndex = -1,
  ...containerProps
}: LegalLinksProps) => (
  <StyledDiv
    className={navigationClassNames.legalLinksContainer}
    tabIndex={tabIndex}
    {...containerProps}
  >
    {includeStripeBadge && (
      <>
        <StripeBadge
          href="https://stripe.com/connect-account/legal/full"
          tooltipProps={{ title: "View Stripe Connected Account Agreement" }}
        />
        <Divider
          orientation="vertical"
          variant="middle"
          style={{ height: "2.25rem", margin: "0 0.5rem" }}
        />
      </>
    )}
    <Tooltip title="Fixit Terms of Service">
      <Link to={APP_PATHS.ToS} tabIndex={tabIndex}>
        Terms {/* <-- Don't rm the \s after Privacy, it elongates the underline */}
      </Link>
    </Tooltip>
    {!includeStripeBadge && <Divider orientation="vertical" variant="middle" />}
    <Tooltip title="Fixit Privacy Policy">
      <Link to={APP_PATHS.PRIVACY} tabIndex={tabIndex}>
        Privacy {/* <-- Don't rm the \s after Privacy, it elongates the underline */}
      </Link>
    </Tooltip>
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",

  [`& > .${brandingClassNames.stripeBadgeRoot}`]: {
    height: "2rem",
    margin: "0 0.5rem",
    [`& .${brandingClassNames.stripeBadgeImg}`]: {
      height: "100%",
    },
  },

  [`& .${dividerClasses.root}`]: {
    height: "1.5rem",
    width: "0.1px",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: alpha(palette.mode === "dark" ? palette.grey[600] : palette.grey[800], 0.5),
  },

  [`& > a[href="${APP_PATHS.ToS}"],a[href="${APP_PATHS.PRIVACY}"]`]: {
    color: palette.mode === "dark" ? palette.grey[500] : palette.grey[700],
    textDecoration: "underline dotted",
    textUnderlinePosition: "under",
    margin: "0 0.5rem",
    whiteSpace: "pre", // preserve whitespace, text includes ending space to elongate underline
  },
}));

export type LegalLinksProps = {
  includeStripeBadge?: boolean;
} & React.ComponentProps<typeof StyledDiv>;
