import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { StripeBadge, stripeBadgeClassNames } from "@components/StripeBadge";
import { Link } from "./Link";

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
export const LegalLinks = ({ includeStripeBadge = false, ...containerProps }: LegalLinksProps) => (
  <StyledDiv className={legalLinksClassNames.container} {...containerProps}>
    {includeStripeBadge && (
      <>
        <Tooltip title="View Stripe Connected Account Agreement">
          <Box className={legalLinksClassNames.stripeBadgeContainer}>
            <StripeBadge href="https://stripe.com/connect-account/legal/full" />
          </Box>
        </Tooltip>
        <Divider
          orientation="vertical"
          variant="middle"
          style={{ height: "2.25rem", margin: "0 0.5rem" }}
        />
      </>
    )}
    <Tooltip title="Fixit Terms of Service">
      <Link to="/ToS">Terms</Link>
    </Tooltip>
    {!includeStripeBadge && <Divider orientation="vertical" variant="middle" />}
    <Tooltip title="Fixit Privacy Policy">
      <Link to="/privacy">Privacy</Link>
    </Tooltip>
  </StyledDiv>
);

export const legalLinksClassNames = {
  container: "legal-links-container",
  stripeBadgeContainer: "legal-links-stripe-badge-container",
};

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  padding: "0.1rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  verticalAlign: "middle",

  [`& > .${legalLinksClassNames.stripeBadgeContainer}`]: {
    height: "2rem",
    margin: "0 0.5rem",
    [`& .${stripeBadgeClassNames.img}`]: {
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

  '& > a[href="/ToS"],a[href="/privacy"]': {
    color: palette.mode === "dark" ? palette.grey[500] : palette.grey[700],
    textDecorationStyle: "dotted",
    margin: "0 0.5rem",
  },
}));

export type LegalLinksProps = {
  includeStripeBadge?: boolean;
} & React.ComponentProps<typeof StyledDiv>;
