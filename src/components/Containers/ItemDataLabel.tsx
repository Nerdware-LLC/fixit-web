import Text from "@mui/material/Typography";

// TODO Try to rm usage of this as a separate component, it results in code that's too convuluted

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
      className="item-data-label"
      style={{
        marginTop: "0.1rem",
        lineHeight: "1.25rem",
        fontWeight: "bold",
        overflowX: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        ...style
      }}
      {...props}
    >
      {children}
    </Text>
  </>
);
