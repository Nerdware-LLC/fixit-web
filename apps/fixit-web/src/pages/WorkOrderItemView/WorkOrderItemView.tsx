import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Loading, ErrorDialog } from "@/components/Indicators";
import { QUERIES } from "@/graphql/queries.js";
import { coreContentViewLayoutClassNames } from "@/layouts/CoreContentViewLayout/classNames.js";
import { CoreItemView } from "@/layouts/CoreItemView";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { WorkOrderItemViewContent } from "./WorkOrderItemViewContent.jsx";
import { WorkOrderItemViewHeader } from "./WorkOrderItemViewHeader.jsx";
import type { SxPropsWithTheme } from "@/app/ThemeProvider/helpers.js";

export const WorkOrderItemView = () => {
  const { id: workOrderID } = useParams();
  const authenticatedUser = authenticatedUserStore.useSubToStore();

  const { data, loading, error } = useQuery(QUERIES.WORK_ORDER, {
    variables: { workOrderID: workOrderID ?? "" },
    fetchPolicy: "cache-only",
    skip: !workOrderID || !authenticatedUser?.id,
  });

  return loading || !data?.workOrder ? (
    <Loading />
  ) : error ? (
    <ErrorDialog error={error} />
  ) : (
    <CoreItemView
      headerLabel="Work Order"
      headerComponents={
        <WorkOrderItemViewHeader
          workOrder={data.workOrder}
          isItemOwnedByUser={data.workOrder.createdBy.id === authenticatedUser?.id}
        />
      }
      sx={workOrderItemViewSX}
    >
      <WorkOrderItemViewContent workOrder={data.workOrder} />
    </CoreItemView>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = WorkOrderItemView;

export const workOrderItemViewSX: SxPropsWithTheme = ({ palette, variables }) => ({
  [`& .${coreContentViewLayoutClassNames.headerContainer}`]: {
    ...(variables.isMobilePageLayout
      ? {
          boxShadow: palette.mode === "dark" ? `0 -3px 8px 8px rgba(0,0,0,0.35)` : 3,
          zIndex: 10, // <-- ensures the box-shadow appears above other elements
        }
      : {
          // On desktop, the header is shrunk to bring the tabs up a bit
          height: "5.5rem",
          minHeight: "5.5rem",
          paddingBottom: "0.5rem",
        }),
  },
  [`& .${coreContentViewLayoutClassNames.sectionDivider}`]: {
    display: "none",
  },
  [`& .${coreContentViewLayoutClassNames.childrenContainer}`]: {
    padding: 0,
    overflowY: "auto",
  },
});
