import { useQuery } from "@apollo/client/react/hooks";
import ConstructionIcon from "@mui/icons-material/Construction";
import { CreateItemButton } from "@components/Buttons/CreateItemButton";
import { EmptyListFallback, type EmptyListFallbackProps } from "@components/HelpInfo";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { CoreItemsListView, type ListViewRenderItemFn } from "@layouts/CoreItemsListView";
import { WorkOrdersListItem } from "./ListItem";
import { workOrderTableProps } from "./tableProps";

export const WorkOrdersListView = () => {
  // TODO impl refetch for WorkOrdersListView
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_WORK_ORDERS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-only", // FIXME rm cache-only fetch policy from WorkOrdersListView
  });

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <CoreItemsListView
      viewHeader="Work Orders"
      viewBasePath="/home/workorders"
      renderItem={renderWorkOrdersListItem}
      headerComponents={
        <CreateItemButton
          createItemFormPath="/home/workorders/form"
          buttonText="Create Work Order"
        />
      }
      lists={[
        {
          listName: "Inbox",
          items: data?.myWorkOrders.assignedToUser ?? [],
          emptyListFallback: (
            <WorkOrdersEmptyListFallback
              text="Your Work Orders Inbox is Empty"
              tooltip="Work Orders you receive from others will appear here"
            />
          ),
        },
        {
          listName: "Sent",
          items: data?.myWorkOrders.createdByUser ?? [],
          emptyListFallback: (
            <WorkOrdersEmptyListFallback
              text="Your List of Sent Work Orders is Empty"
              tooltip="Work Orders you send to others will appear here"
            />
          ),
        },
      ]}
      tableProps={{
        ...workOrderTableProps,
        rows: [
          ...(data?.myWorkOrders.createdByUser.map((wo) => ({
            isItemOwnedByUser: true,
            ...wo,
          })) ?? []),
          ...(data?.myWorkOrders.assignedToUser.map((wo) => ({
            isItemOwnedByUser: false,
            ...wo,
          })) ?? []),
        ],
        noRowsOverlayProps: {
          backgroundIcon: <ConstructionIcon />,
          // TODO add children here
        },
      }}
    />
  );
};

const WorkOrdersEmptyListFallback = ({
  backgroundIcon = <ConstructionIcon />,
  ...props
}: Partial<EmptyListFallbackProps>) => (
  <EmptyListFallback
    backgroundIcon={<ConstructionIcon />}
    style={{ height: "50%", whiteSpace: "normal", marginTop: "6rem" }}
    // TODO move above styles to CoreItemsListView (must only apply in dual-list views)
    {...props}
  />
);

const renderWorkOrdersListItem: ListViewRenderItemFn = (props) => <WorkOrdersListItem {...props} />;
