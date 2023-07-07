import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { DashboardDataContextProvider } from "./DashboardDataContext";
import { DashboardWidgetContainer } from "./DashboardWidgetContainer";
import { InvoiceAmountTotalsWidget } from "./InvoiceAmountTotalsWidget";
import { WorkOrdersPerMonthChart, InvoicesPerMonthChart } from "./ItemsPerMonthCharts";
import { WorkOrdersByStatusCounter, InvoicesByStatusCounter } from "./StatusCountWidgets";
import { WorkOrderUpcomingEventsWidget } from "./WorkOrderUpcomingEventsWidget";
import { dashboardPageClassNames } from "./classNames";

// IDEA Idea for new widget: count number of overdue work orders, and/or how many are due/scheduled in x days
// IDEA Idea for new widget/page: CALENDAR VIEW, for due/scheduled dates
// IDEA Idea for new widget/page: Colored layout of WOs, highlighted by priority

export const DashboardPage = () => {
  return (
    <DashboardDataContextProvider>
      <StyledDiv className={dashboardPageClassNames.root}>
        {/* TOP ROW VIEW HEADER */}

        <Text variant="h1">Dashboard</Text>

        {/* WIDGETS AREA: flex row of WorkOrder-widgets then Invoice-widgets */}

        <div className={dashboardPageClassNames.widgetsArea}>
          {/* Work Order Widgets */}

          <div className={dashboardPageClassNames.widgetsGroup}>
            <div className={dashboardPageClassNames.widgetsSubGroup}>
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

          <div className={dashboardPageClassNames.widgetsGroup}>
            <div className={dashboardPageClassNames.widgetsSubGroup}>
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
      </StyledDiv>
    </DashboardDataContextProvider>
  );
};

const StyledDiv = styled("div")(({ theme }) => {
  const viewPadding = "0.75rem";

  const headerHeight = "2rem";
  const headerBottomMargin = "0.5rem";

  return {
    height: "100%",
    padding: viewPadding,
    overflowY: "auto",

    // "Dashboard" header styles
    [`& > h1.${typographyClasses.root}`]: {
      fontSize: "2rem",
      lineHeight: headerHeight,
      margin: `${viewPadding} 0 ${headerBottomMargin} ${viewPadding}`,
    },

    /* The widgets' layout is defined by three levels of nested containers:

    1. widgets-area       col < 1200px < row   Contains two widget groups, 1 for WOs, 1 for INVs.
    2. widgets-group      col                  Contains 1 large widget and 2 small ones.
    3. widgets-subgroup   col < 600px < row    Container for 2 small widgets' layout.
  */

    [`& > .${dashboardPageClassNames.widgetsArea}`]: {
      minHeight: `calc( 100% - (${viewPadding} * 2 + ${headerHeight}))`,
      width: "100%",
      display: "flex",
      flexDirection: "column",

      [theme.breakpoints.up("xl")]: {
        height: `calc( 100% - (${viewPadding} * 2 + ${headerHeight}))`,
        flexDirection: "row",
      },

      [`& > .${dashboardPageClassNames.widgetsGroup}`]: {
        height: "50%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        [theme.breakpoints.up("xl")]: {
          height: "100%",
          width: "50%",
        },

        // LARGE widgets:

        [`& > .${dashboardPageClassNames.widgetLarge}`]: {
          height: "27rem",
        },

        // Subgroups:

        [`& > .${dashboardPageClassNames.widgetsSubGroup}`]: {
          display: "flex",
          flexDirection: "column",

          [theme.breakpoints.up(700)]: {
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
          },

          // SMALL widgets:

          [`& > .${dashboardPageClassNames.widgetSmall}`]: {
            height: "20rem",

            [theme.breakpoints.up(700)]: {
              width: "calc( 50% - 1.5rem )",
            },
          },
        },
      },
    },
  };
});
