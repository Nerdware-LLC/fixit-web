import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { itemDetailsClassNames as classNames } from "./classNames";
import type { ItemDetailsLabelProps } from "./types";

export const ItemDetailsLabel = ({
  icon,
  variant = "h6",
  children,
  ...props
}: ItemDetailsLabelProps) => (
  <>
    {icon}
    <StyledText className={classNames.label} variant={variant} {...props}>
      {children}
    </StyledText>
  </>
);

const StyledText = styled(Text)(({ theme }) => ({
  [`&.${classNames.label}`]: {
    margin: "0.25rem 0",
    fontSize: "0.9rem",
    fontWeight: theme.palette.mode === "dark" ? 200 : "normal",
    lineHeight: "1rem",
    textTransform: "uppercase",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));
