import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import { ItemDetailsLabel } from "./ItemDetailsLabel";
import type { ItemDetailsProps } from "./ItemDetails";

/**
 * Displays one or more ItemDetails components as a group.
 */
export const ItemDetailsGroup = ({
  header,
  label,
  labelVariant,
  labelIcon,
  children,
  emptyFallback = <Text>--</Text>,
  ...containerProps // any remaining props are passed to the containing div
}: ItemDetailsProps) => (
  <ItemDetailsGroupContainer
    className="item-details-group item-details-group-container"
    {...containerProps}
  >
    {(header || label) && (
      <Paper className="item-details-group-header" elevation={0}>
        {label && (
          <>
            {labelIcon}
            <ItemDetailsLabel variant={labelVariant}>{label}</ItemDetailsLabel>
          </>
        )}
        {header}
      </Paper>
    )}
    <div className="item-details-group-content">
      {typeof children === "string" ? <Text>{children || "--"}</Text> : children ?? emptyFallback}
    </div>
  </ItemDetailsGroupContainer>
);

const ItemDetailsGroupContainer = styled(Box)(({ theme }) => ({
  ...(theme.palette.mode === "light" && {
    border: `2px solid ${theme.palette.divider}`
  }),
  borderRadius: "0.35rem",
  overflow: "hidden",

  "& *": {
    textOverflow: "ellipsis"
  },

  // HEADER:

  "& > .item-details-group-header": {
    width: "100%",
    padding: "1rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: alpha(theme.palette.divider, 0.05),
    borderRadius: "0.35rem 0.35rem 0 0",

    "& > .MuiTypography-root": {
      color: theme.palette.text.primary
    },

    "& > svg:first-of-type": {
      marginRight: "0.75rem"
    }
  },

  // CONTENT:

  "& > .item-details-group-content": {
    position: "relative",
    zIndex: 1,
    padding: "1.25rem",
    borderRadius: "0 0 0.35rem 0.35rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem 2rem",

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
          : "inset 0 1px 5px 0 rgba(0,0,0,0.05)"
    }
  }
}));
