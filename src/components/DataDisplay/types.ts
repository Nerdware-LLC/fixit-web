import type { BoxProps } from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";

export type ItemDetailsProps = {
  label?: string;
  labelIcon?: ItemDetailsLabelProps["icon"];
  labelVariant?: ItemDetailsLabelProps["variant"];
  headerComponents?: React.ReactNode;
  children?: React.ReactNode;
  emptyFallback?: React.ReactNode;
} & BoxProps;

export type ItemDetailsLabelProps = { icon?: React.ReactNode } & TypographyProps;
