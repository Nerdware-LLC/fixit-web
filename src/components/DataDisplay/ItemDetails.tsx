import { isString } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { ItemDetailsHeader, type ItemDetailsHeaderProps } from "./ItemDetailsHeader";
import { dataDisplayClassNames } from "./classNames";
import type { Simplify } from "type-fest";

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
  className = "",
  children,
  emptyFallback = <Text>--</Text>,
  ...boxProps // any remaining props are passed to the containing div
}: ItemDetailsProps) => (
  <StyledBox className={dataDisplayClassNames.root + " " + className} {...boxProps}>
    {(label || headerComponents) && (
      <ItemDetailsHeader
        label={label}
        labelIcon={labelIcon}
        labelVariant={labelVariant}
        headerComponents={headerComponents}
      />
    )}
    <div className={dataDisplayClassNames.content}>
      {isString(children) ? <Text>{children || "--"}</Text> : children ?? emptyFallback}
    </div>
  </StyledBox>
);

const StyledBox = styled(Box)({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",

  "& *": {
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  [`& > .${dataDisplayClassNames.content}`]: {
    marginTop: "0.3rem",
  },
});

export type ItemDetailsProps = Simplify<
  ItemDetailsHeaderProps & { emptyFallback?: React.ReactNode } & BoxProps
>;
