import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql";
import { Loading, Error } from "@components";
import { CoreItemView } from "@layouts";
import { WorkOrderItemViewHeader } from "./ItemViewHeader";
import { WorkOrderItemViewContent } from "./ItemViewContent";
import { MOCK_WORK_ORDERS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const WorkOrderItemView = () => {
  const { id } = useParams();
  // Get isItemOwnedByUser state-param provided by CoreItemsList component
  const {
    state: { isItemOwnedByUser }
  } = useLocation();

  const { loading, error, networkStatus } = useQuery(QUERIES.WORK_ORDER, {
    // TODO fetchPolicy: cache only?
    variables: { workOrderID: id },
    notifyOnNetworkStatusChange: true,
    skip: true // TODO turn this off later
  });

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  const MOCK_workOrder = [
    ...MOCK_WORK_ORDERS.myWorkOrders.createdByUser,
    ...MOCK_WORK_ORDERS.myWorkOrders.assignedToUser
  ].find((wo) => wo.id === id);

  if (!MOCK_workOrder) return null;

  return (
    <CoreItemView
      headerLabel="Work Order"
      headerComponents={
        <WorkOrderItemViewHeader workOrder={MOCK_workOrder} isItemOwnedByUser={isItemOwnedByUser} />
      }
    >
      <WorkOrderItemViewContent workOrder={MOCK_workOrder} isItemOwnedByUser={isItemOwnedByUser} />
    </CoreItemView>
  );
};
