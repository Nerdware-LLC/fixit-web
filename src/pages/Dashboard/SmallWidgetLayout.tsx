import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";

export const SmallWidgetLayout = ({
  header,
  children,
  ...containerProps
}: {
  header: string;
} & React.ComponentProps<typeof StyledSmallWidgetLayoutContainer>) => (
  <StyledSmallWidgetLayoutContainer
    className="dashboard-small-widget-layout-container"
    {...containerProps}
  >
    <div className="dashboard-widget-header-container">
      <Text className="dashboard-widget-header">{header}</Text>
    </div>
    {children}
  </StyledSmallWidgetLayoutContainer>
);

const StyledSmallWidgetLayoutContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  minWidth: "16rem", // minWidth of parent is 18rem, padding is 1rem each side

  // WIDGET HEADER:
  "& > .dashboard-widget-header-container": {
    height: "15%",
    minHeight: "2.5rem",

    "& > .dashboard-widget-header": {
      color: alpha(theme.palette.text.primary, 0.75),
      fontSize: "0.95rem",
      fontWeight: "bold",
      textAlign: "center",
      whiteSpace: "nowrap"
    }
  },

  // CHILD CONTENT:
  "& > :not(.dashboard-widget-header-container)": {
    height: "85%",
    width: "100%",
    display: "flex"
  }
}));
