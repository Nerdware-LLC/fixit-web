import Text from "@mui/material/Typography";

export const ItemDetailsLabel = ({
  icon,
  variant = "h6",
  style = {},
  sx = {},
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
        textTransform: "uppercase",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        ...style
      }}
      sx={({ palette }) => ({
        fontWeight: palette.mode === "dark" ? 200 : "normal",
        ...(sx as any)
      })}
      {...props}
    >
      {children}
    </Text>
  </>
);
