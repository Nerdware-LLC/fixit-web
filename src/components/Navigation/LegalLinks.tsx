import { Fragment } from "react";
import { styled, alpha } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { APP_PATHS } from "@/routes/appPaths.js";
import { Link } from "./Link.jsx";
import { navigationClassNames } from "./classNames.js";
import type { Except } from "type-fest";

/**
 * Legal links:
 * - `Terms`: `"/ToS"`
 * - `Privacy`: `"/privacy"`
 * - `Cookies`: `"/cookie-policy"`
 */
export const LegalLinks = ({
  useLongLabels = false,
  tabIndex = -1,
  ...divProps
}: LegalLinksProps) => (
  <StyledDiv tabIndex={tabIndex} className={navigationClassNames.legalLinksRoot} {...divProps}>
    <div className={navigationClassNames.legalAppLinksContainer}>
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
          {index !== 0 && <Divider orientation="vertical" />}
          <Tooltip title={tooltip}>
            <Link to={link} tabIndex={tabIndex}>
              {label}
            </Link>
          </Tooltip>
        </Fragment>
      ))}
    </div>
  </StyledDiv>
);

const StyledDiv = styled("div")<LegalLinksProps>(({ theme: { palette } }) => ({
  minHeight: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",

  [`& .${dividerClasses.root}`]: {
    height: "1.75rem",
    alignSelf: "center",
    backgroundColor: alpha(palette.mode === "dark" ? palette.grey[600] : palette.grey[800], 0.5),
  },

  [`& > .${navigationClassNames.legalAppLinksContainer}`]: {
    width: "inherit",
    display: "flex",
    alignItems: "center",
    flexDirection: "inherit",
    gap: "inherit",

    "& > a": {
      color: palette.mode === "dark" ? palette.grey[500] : palette.grey[700],
      whiteSpace: "pre", // preserve whitespace, text includes ending space to elongate underline
      transform: "translateY(-1px)", // nudged up bc the underline makes the text appear to not be centered vertically
    },
  },
}));

export type LegalLinksProps = {
  /**
   * Whether to use the "long" names for the legal links, e.g. "Terms of Service"
   * instead of "Terms" (default: `false`).
   */
  useLongLabels?: boolean;
} & Except<React.ComponentProps<"div">, "className" | "children">;
