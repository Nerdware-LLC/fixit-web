import Paper, { type PaperProps } from "@mui/material/Paper";
import { ErrorBoundary, ErrorFallback } from "@components/ErrorBoundary";
import { dashboardPageClassNames } from "./classNames";

/**
 * Container for Dashboard widgets
 * - Must have `size` value: `"small" | "large"`
 */
export const DashboardWidgetContainer = ({ size, children }: DashboardWidgetContainerProps) => (
  <Paper
    elevation={0}
    style={{
      margin: "0.75rem",
      padding: "1rem",
      minWidth: "18rem",
    }}
    className={
      size === "large" ? dashboardPageClassNames.widgetLarge : dashboardPageClassNames.widgetSmall
    }
  >
    <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>
  </Paper>
);

export type DashboardWidgetContainerProps = { size: "small" | "large" } & PaperProps;
