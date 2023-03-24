import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { ItemDetailsLabel, type ItemDetailsLabelProps } from "./ItemDetailsLabel";
import { itemDetailsClassNames as classNames } from "./classNames";

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
  label,
  labelIcon,
  labelVariant,
  headerComponents,
  children,
  emptyFallback = <Text>--</Text>,
  ...containerProps // any remaining props are passed to the containing div
}: ItemDetailsProps) => (
  <ItemDetailsContainer
    className={`${classNames.itemDetails} ${classNames.container}`}
    {...containerProps}
  >
    {(label || headerComponents) && (
      <div className={classNames.header}>
        {label && (
          <>
            {labelIcon}
            <ItemDetailsLabel variant={labelVariant}>{label}</ItemDetailsLabel>
          </>
        )}
        {headerComponents}
      </div>
    )}
    <div className={classNames.content}>
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

  [`& > .${classNames.header}`]: {
    height: "auto",
    width: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    [`& > .${classNames.label}`]: {
      color: theme.palette.text.primary,
      marginTop: 0,
      opacity: "0.7"
    },

    "& > svg:first-of-type": {
      marginRight: "0.75rem"
    }
  }
}));

export type ItemDetailsProps = {
  label?: string;
  labelIcon?: ItemDetailsLabelProps["icon"];
  labelVariant?: ItemDetailsLabelProps["variant"];
  headerComponents?: React.ReactNode;
  children?: React.ReactNode;
  emptyFallback?: React.ReactNode;
} & React.ComponentProps<typeof ItemDetailsContainer>;
