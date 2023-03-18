import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { ItemDetailsLabel } from "./ItemDetailsLabel";

// TODO Create a separate ItemDetailsGroup component

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
}: ItemDetailsProps) => (
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
  maxWidth: "100%",

  "& *": {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  // HEADER:

  "& > .item-details-header": {
    height: "auto",
    width: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "& > .item-details-label": {
      color: theme.palette.text.primary,
      marginTop: 0,
      opacity: "0.7"
    },

    "& > svg:first-of-type": {
      marginRight: "0.75rem"
    }
  },

  // CONTENT:

  "& > .item-details-content": {
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }
}));

export type ItemDetailsProps = {
  header?: React.ReactNode;
  label?: string;
  labelVariant?: React.ComponentProps<typeof ItemDetailsLabel>["variant"];
  labelIcon?: React.ComponentProps<typeof ItemDetailsLabel>["icon"];
  children?: React.ReactNode;
  emptyFallback?: React.ReactNode;
} & React.ComponentProps<typeof ItemDetailsContainer>;
