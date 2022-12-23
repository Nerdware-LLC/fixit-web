import Text from "@mui/material/Typography";
import React from "react";

export const ItemDataLabel = ({
  icon,
  variant = "subtitle1",
  color = "info",
  style = {},
  children,
  ...props
}: { icon?: React.ReactNode } & React.ComponentProps<typeof Text>) => (
  <>
    {icon}
    <Text
      variant={variant}
      color={color}
      style={{
        marginTop: "0.1rem",
        lineHeight: "1.25rem",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        ...(icon && { marginLeft: "0.75rem" }),
        ...style
      }}
      {...props}
    >
      {children}
    </Text>
  </>
);
