import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { ItemDetailsLabel } from "./ItemDetailsLabel";

/**
 * Displays one or more item properties.
 * - Can be nested for grouping related properties together.
 * - Multiple types can be provided as `children`:
 *
 * > | IF `children` IS ...            | RENDER RESULT             |
 *   | :------------------------------ | :------------------------ |
 *   | a non-empty string              | `<Text>{children}</Text>` |
 *   | an empty string                 | `<Text>--</Text>`         |
 *   | a non-nullish, non-string value | `{children}`              |
 *   | a nullish value                 | `{emptyFallback}`         |
 *
 * > _**Note:** `emptyFallback` defaults to `<Text>--</Text>`_
 */
export const ItemDetails = ({
  header,
  label,
  labelVariant,
  labelIcon,
  children,
  emptyFallback = <Text>--</Text>,
  ...containerProps // any remaining props are passed to the containing div
}: {
  header?: React.ReactNode;
  label?: string;
  labelVariant?: React.ComponentProps<typeof ItemDetailsLabel>["variant"];
  labelIcon?: React.ComponentProps<typeof ItemDetailsLabel>["icon"];
  children?: React.ReactNode;
  emptyFallback?: React.ReactNode;
} & React.ComponentProps<typeof ItemDetailsContainer>) => (
  <ItemDetailsContainer className="item-details item-details-container" {...containerProps}>
    {(header || label) && (
      <div className="item-details-header">
        {label && (
          <>
            {labelIcon}
            <ItemDetailsLabel variant={labelVariant}>{label}</ItemDetailsLabel>
          </>
        )}
        {header}
      </div>
    )}
    <div className="item-details-content">
      {typeof children === "string" ? <Text>{children || "--"}</Text> : children ?? emptyFallback}
    </div>
  </ItemDetailsContainer>
);

const ItemDetailsContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "0.35rem",

  "& *": {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  // HEADER:

  "& > .item-details-header": {
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: "0 0 2px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,

    "& .MuiTypography-root": {
      color: theme.palette.text.primary
    },

    "& > svg:first-of-type": {
      marginRight: "0.75rem"
    }
  },

  // CONTENT:

  "& > .item-details-content": {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  },

  /* NESTED ItemDetails:
      - may be placed within HEADER or CONTENT
      - no borders
      - no padding
      - label opacity set to 0.7, no margin-top
      - header height set to auto
  */
  "& > .item-details-header, .item-details-content": {
    "& div.item-details-container": {
      border: "none",
      "& > div.item-details-header": {
        height: "auto",
        padding: "0",
        border: "none",
        "& > .item-details-label": {
          marginTop: 0,
          opacity: "0.7"
        }
      },
      "& > div.item-details-content": {
        padding: "0"
      }
    }
  }
}));
