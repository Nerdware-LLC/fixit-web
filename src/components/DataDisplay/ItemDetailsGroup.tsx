import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import { ItemDetailsLabel } from "./ItemDetailsLabel";
import { itemDetailsClassNames as classNames } from "./classNames";
import type { ItemDetailsProps } from "./types";

/**
 * Displays one or more ItemDetails components as a group.
 */
export const ItemDetailsGroup = ({
  label,
  labelIcon,
  labelVariant,
  headerComponents,
  children,
  emptyFallback = <Text>--</Text>,
  ...containerProps // any remaining props are passed to the containing div
}: ItemDetailsProps) => (
  <StyledBox
    className={`${classNames.itemDetailsGroup} ${classNames.groupContainer}`}
    {...containerProps}
  >
    {(label || headerComponents) && (
      <Paper className={classNames.groupHeader} elevation={0}>
        {label && (
          <>
            {labelIcon}
            <ItemDetailsLabel variant={labelVariant}>{label}</ItemDetailsLabel>
          </>
        )}
        {headerComponents}
      </Paper>
    )}
    <div className={classNames.groupContent}>
      {typeof children === "string" ? <Text>{children || "--"}</Text> : children ?? emptyFallback}
    </div>
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme }) => ({
  ...(theme.palette.mode === "light" && {
    border: `2px solid ${theme.palette.divider}`,
  }),
  borderRadius: "0.35rem",
  overflow: "hidden",

  "& *": {
    textOverflow: "ellipsis",
  },

  // HEADER:

  [`& > .${classNames.groupHeader}`]: {
    width: "100%",
    padding: "1rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: alpha(theme.palette.divider, 0.05),
    borderRadius: "0.35rem 0.35rem 0 0",

    [`& > .${classNames.label}`]: {
      color: theme.palette.text.primary,
    },

    "& > svg:first-of-type": {
      marginRight: "0.75rem",
    },
  },

  // CONTENT:

  [`& > .${classNames.groupContent}`]: {
    position: "relative",
    zIndex: 1,
    padding: "1.25rem",
    borderRadius: "0 0 0.35rem 0.35rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem 2rem",
    backgroundColor: theme.palette.background.paper,

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
        theme.palette.mode === "dark"
          ? "inset 0 1px 5px 1px rgba(0,0,0,0.2)"
          : "inset 0 1px 5px 0 rgba(0,0,0,0.05)",
    },
  },
}));
