import Box, { type BoxProps } from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { errorBoundaryClassNames } from "./classNames";
import type { Except } from "type-fest";

/**
 * A default `fallback` component for `ErrorBoundary`.
 */
export const DefaultErrorFallback = ({
  errorMessage,
  style = {},
  ...boxProps
}: DefaultErrorFallbackProps) => (
  <Box
    className={errorBoundaryClassNames.defaultErrorFallbackRoot}
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      ...style,
    }}
    {...boxProps}
  >
    <Text>{errorMessage || `Whoops! Something went wrong  :(\nPlease try again later.`}</Text>
  </Box>
);

export type DefaultErrorFallbackProps = {
  errorMessage?: string;
} & Except<BoxProps, "children" | "className">;
