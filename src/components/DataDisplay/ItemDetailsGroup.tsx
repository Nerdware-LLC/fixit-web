import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { getMuiPaperStyles } from "@/app/ThemeProvider/helpers.js";
import { ItemDetailsHeader } from "./ItemDetailsHeader.jsx";
import { dataDisplayClassNames } from "./classNames.js";
import type { ItemDetailsProps } from "./ItemDetails.jsx";

/**
 * Displays one or more ItemDetails components as a group.
 */
export const ItemDetailsGroup = ({
  label,
  labelIcon,
  labelVariant,
  headerComponents,
  className = "",
  children,
  emptyFallback = <Text>--</Text>,
  ...boxProps // any remaining props are passed to the containing div
}: ItemDetailsProps) => (
  <StyledBox className={dataDisplayClassNames.groupRoot + " " + className} {...boxProps}>
    {(label || headerComponents) && (
      <ItemDetailsHeader
        label={label}
        labelIcon={labelIcon}
        labelVariant={labelVariant}
        headerComponents={headerComponents}
        className={dataDisplayClassNames.groupHeader}
      />
    )}
    <div className={dataDisplayClassNames.groupContent}>
      {typeof children === "string" ? <Text>{children || "--"}</Text> : (children ?? emptyFallback)}
    </div>
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme: { palette, shadows, transitions } }) => ({
  ...(palette.mode === "light" && { border: `2px solid ${palette.divider}` }),
  borderRadius: "0.35rem",

  display: "flex",
  flexDirection: "column",

  overflow: "hidden",
  textOverflow: "ellipsis",

  "& *": {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  // HEADER:
  [`& > .${dataDisplayClassNames.groupHeader}`]: {
    fontSize: "1rem !important",
    padding: "1.1rem 1rem 1rem 1rem",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: alpha(palette.divider, 0.05),
    borderRadius: "0.35rem 0.35rem 0 0",
    ...getMuiPaperStyles(1, { palette, shadows, transitions }),
    "& *": {
      lineHeight: "1.5 !important",
      [`&.${dataDisplayClassNames.label}`]: {
        fontSize: "1rem",
        opacity: "1 !important", // rm opacity from header label
      },
    },
  },

  // CONTENT:
  [`& > .${dataDisplayClassNames.groupContent}`]: {
    position: "relative",
    zIndex: 1,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "1.5rem 2rem",
    borderRadius: "0 0 0.35rem 0.35rem",
    backgroundColor: palette.background.paper,

    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: 2,
      pointerEvents: "none",
      top: 0,
      left: "-10px",
      display: "block",
      height: "calc(100% + 20px)",
      width: "110%",
      boxShadow:
        palette.mode === "dark"
          ? "inset 0 1px 5px 1px rgba(0,0,0,0.2)"
          : "inset 0 1px 5px 0 rgba(0,0,0,0.05)",
    },
  },
}));
