import Paper from "@mui/material/Paper";

// small widget containers = 2/3 height of large widget containers

export const DashboardWidgetContainer = ({
  size,
  children
}: {
  size: "small" | "large";
  children: React.ReactNode;
} & React.ComponentProps<typeof Paper>) => (
  <Paper
    elevation={0}
    className="dashboard-widget-container"
    sx={(theme) => ({
      margin: "0.75rem",
      padding: "1rem",
      // All height/width calc -1.5rem to account for margin:
      width: "calc(100% - 1.5rem)",
      minWidth: "18rem",

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
    })}
  >
    {children}
  </Paper>
);
