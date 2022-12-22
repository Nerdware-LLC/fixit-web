import Text from "@mui/material/Typography";
import React from "react";

export const ItemDataLabel = ({
  variant = "subtitle1",
  color = "info",
  style = {},
  children,
  ...props
}: React.ComponentProps<typeof Text>) => (
  <Text
    variant={variant}
    color={color}
    style={{ whiteSpace: "nowrap", fontWeight: "500", ...style }}
    {...props}
  >
    {children}
  </Text>
);
