import Text from "@mui/material/Typography";

export const ItemDetailsLabel = ({
  icon,
  variant = "h6",
  style = {},
  children,
  ...props
}: { icon?: React.ReactNode } & React.ComponentProps<typeof Text>) => (
  <>
    {icon}
    <Text
      className="item-details-label"
      variant={variant}
      style={{
        margin: "0.25rem 0",
        fontSize: "0.9rem",
        lineHeight: "1rem",
        fontWeight: "200",
        textTransform: "uppercase",
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
