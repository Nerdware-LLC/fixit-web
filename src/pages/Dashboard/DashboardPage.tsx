import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { DashboardDataContextProvider } from "./DashboardDataContext";
import { WorkOrdersByStatusCounter, InvoicesByStatusCounter } from "./StatusCountWidgets";
import { WorkOrdersPerMonthChart, InvoicesPerMonthChart } from "./ItemsPerMonthCharts";
import { WorkOrderUpcomingEventsWidget } from "./WorkOrderUpcomingEventsWidget";
import { InvoiceAmountTotalsWidget } from "./InvoiceAmountTotalsWidget";

export const DashboardPage = () => {
  return (
    <DashboardDataContextProvider>
      <DashboardContentContainer className="dashboard-view">
        {/* TOP ROW VIEW HEADER */}

        <Text variant="h4" component="h1">
          Dashboard
        </Text>

        {/* WIDGETS AREA: flex row of WorkOrder-widgets then Invoice-widgets */}

        <div className="dashboard-widgets-area">
          {/* Work Order Widgets */}

          <div className="dashboard-widgets-group">
            <div className="dashboard-widgets-subgroup">
              <DashboardWidgetContainer size="small">
                <WorkOrdersByStatusCounter />
              </DashboardWidgetContainer>
              <DashboardWidgetContainer size="small">
                <WorkOrderUpcomingEventsWidget />
              </DashboardWidgetContainer>
            </div>

            <DashboardWidgetContainer size="large">
              <WorkOrdersPerMonthChart />
            </DashboardWidgetContainer>
          </div>

          {/* Invoice Widgets */}

          <div className="dashboard-widgets-group">
            <div className="dashboard-widgets-subgroup">
              <DashboardWidgetContainer size="small">
                <InvoicesByStatusCounter />
              </DashboardWidgetContainer>
              <DashboardWidgetContainer size="small">
                <InvoiceAmountTotalsWidget />
              </DashboardWidgetContainer>
            </div>

            <DashboardWidgetContainer size="large">
              <InvoicesPerMonthChart />
            </DashboardWidgetContainer>
          </div>
        </div>
      </DashboardContentContainer>
    </DashboardDataContextProvider>
  );
};

const DashboardContentContainer = styled("div")(({ theme }) => ({
  padding: "1rem 0.75rem 0.75rem 0.75rem",

  [theme.breakpoints.up("xl")]: {
    minHeight: "100%"
  },

  // "Dashboard" header styles
  "& > .MuiTypography-root": {
    paddingLeft: "0.75rem",
    lineHeight: "2.75rem"
  },

  /* The widgets' layout is defined by three levels of nested containers:

    1. widgets-area       col < 1200px < row   Contains two widget groups, 1 for WOs, 1 for INVs.
    2. widgets-group      col                  Contains 1 large widget and 2 small ones.
    3. widgets-subgroup   col < 600px < row    Container for 2 small widgets' layout.
  */

  "& > div.dashboard-widgets-area": {
    minHeight: "calc(100% - 2.75rem)",
    width: "100%",
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.up("xl")]: {
      height: "calc(100% - 2.75rem)",
      flexDirection: "row"
    },

    "& > div.dashboard-widgets-group": {
      height: "50%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      [theme.breakpoints.up("xl")]: {
        height: "100%",
        width: "50%"
      },

      // LARGE widgets:

      "& > div.widget-size-large": {
        height: "27rem"
      },

      // Subgroups:

      "& > div.dashboard-widgets-subgroup": {
        display: "flex",
        flexDirection: "column",

        [theme.breakpoints.up(700)]: {
          flexDirection: "row",
          flexGrow: 1,
          alignItems: "center"
        },

        // SMALL widgets:

        "& > div.widget-size-small": {
          height: "20rem",

          [theme.breakpoints.up(700)]: {
            width: "calc(50% - 1.5rem)"
          }
        }
      }
    }
  }
}));

const DashboardWidgetContainer = ({
  size,
  children
}: {
  size: "small" | "large";
  children: React.ReactNode;
} & React.ComponentProps<typeof Paper>) => (
  <Paper
    elevation={0}
    className={["dashboard-widget-container", `widget-size-${size}`].join(" ")}
    style={{
      margin: "0.75rem",
      padding: "1rem",
      minWidth: "18rem"
    }}
  >
    {children}
  </Paper>
);
