import Text, { type TypographyProps } from "@mui/material/Typography";
import { itemDetailsClassNames as classNames } from "./classNames";

export const ItemDetailsLabel = ({
  icon,
  variant = "h6",
  style = {},
  sx = {},
  children,
  ...props
}: ItemDetailsLabelProps) => (
  <>
    {icon}
    <Text
      className={classNames.label}
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

export type ItemDetailsLabelProps = { icon?: React.ReactNode } & TypographyProps;
