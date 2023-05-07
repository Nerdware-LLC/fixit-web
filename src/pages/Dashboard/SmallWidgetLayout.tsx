import { styled, alpha } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text, { typographyClasses } from "@mui/material/Typography";

export const SmallWidgetLayout = ({
  header,
  children,
  ...boxProps
}: { header: string } & BoxProps) => (
  <StyledBox {...boxProps}>
    <div>
      <Text>{header}</Text>
    </div>
    {children}
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  minWidth: "16rem", // minWidth of parent is 18rem, padding is 1rem each side

  // WIDGET HEADER:
  "& > div:first-of-type": {
    height: "15%",
    minHeight: "2.5rem",

    [`& > .${typographyClasses.root}`]: {
      color: alpha(theme.palette.text.primary, 0.75),
      fontSize: "0.95rem",
      fontWeight: "bold",
      textAlign: "center",
      whiteSpace: "nowrap",
    },
  },

  // CHILD CONTENT:
  "& > *:not(div:first-of-type)": {
    // "& > :not(.dashboard-widget-header-container)": {
    height: "85%",
    width: "100%",
    display: "flex",
  },
}));
