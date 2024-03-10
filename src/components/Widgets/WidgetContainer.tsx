import Paper, { type PaperProps } from "@mui/material/Paper";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { widgetClassNames } from "./classNames";

/**
 * Container for Dashboard widgets
 * - Must have `size` value: `"small" | "large"`
 */
export const WidgetContainer = ({ size, children }: DashboardWidgetContainerProps) => (
  <Paper
    elevation={0}
    style={{
      margin: "0.75rem",
      padding: "1rem",
      minWidth: "18rem",
    }}
    className={size === "large" ? widgetClassNames.sizeLarge : widgetClassNames.sizeSmall}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </Paper>
);

export type DashboardWidgetContainerProps = { size: "small" | "large" } & PaperProps;
