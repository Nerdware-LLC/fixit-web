import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

/**
 * Container for Dashboard widgets
 * - Must have `size` value: `"small" | "large"`
 * - Small widgets are 2/3 height of large widgets
 */
export const DashboardWidgetContainer = ({
  size,
  children
}: React.ComponentProps<typeof StyledDashboardWidgetContainer>) => (
  <StyledDashboardWidgetContainer className="dashboard-widget-container" size={size} elevation={0}>
    {children}
  </StyledDashboardWidgetContainer>
);

const StyledDashboardWidgetContainer = styled(Paper, {
  shouldForwardProp: (propName) => propName !== "size"
})<{ size: "small" | "large" }>(({ theme, size }) => ({
  margin: "0.75rem",
  padding: "1rem",
  // All height/width calc -1.5rem to account for margin:
  width: "calc(100% - 1.5rem)",
  minWidth: "18rem",
  // SIZE related values:
  ...(size === "large"
    ? {
        height: "calc(60% - 1.5rem)"
      }
    : {
        height: "calc(100% - 1.5rem)", // height 100%, bc a parent container is @ 40%
        // maxHeight: "18rem",
        [theme.breakpoints.up("sm")]: {
          width: "calc(50% - 1.5rem)"
        }
      })
}));
