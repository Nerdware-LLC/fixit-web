import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { coreContentViewLayoutClassNames } from "@layouts/CoreContentViewLayout/classNames";
import { CoreItemView } from "@layouts/CoreItemView";
import { WorkOrderItemViewContent } from "./ItemViewContent";
import { WorkOrderItemViewHeader } from "./ItemViewHeader";

export const WorkOrderItemView = () => {
  const { id } = useParams();
  // Get isItemOwnedByUser state-param provided by CoreItemsList component
  const {
    state: { isItemOwnedByUser },
  } = useLocation();

  const { data, loading, error, networkStatus } = useQuery(QUERIES.WORK_ORDER, {
    variables: { workOrderID: id || "" },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-only",
    skip: !id,
  });

  return loading || networkStatus === 4 || !data?.workOrder ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <CoreItemView
      headerLabel="Work Order"
      headerComponents={
        <WorkOrderItemViewHeader workOrder={data.workOrder} isItemOwnedByUser={isItemOwnedByUser} />
      }
      sx={(theme) => ({
        [`& .${coreContentViewLayoutClassNames.headerContainer}`]: {
          ...(theme.variables.isMobilePageLayout
            ? {
                boxShadow: theme.palette.mode === "dark" ? `0 -3px 8px 8px rgba(0,0,0,0.35)` : 3,
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
      })}
    >
      <WorkOrderItemViewContent workOrder={data.workOrder} isItemOwnedByUser={isItemOwnedByUser} />
    </CoreItemView>
  );
};
