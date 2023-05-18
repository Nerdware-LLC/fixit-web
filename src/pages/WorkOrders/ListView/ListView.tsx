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
  const { data, loading, error } = useQuery(QUERIES.MY_WORK_ORDERS);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <CoreItemsListView
      viewHeader="Work Orders"
      viewBasePath="/home/workorders"
      renderItem={renderWorkOrdersListItem}
      listViewSettingsStoreKey="workOrders"
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
    {...props}
  />
);

const renderWorkOrdersListItem: ListViewRenderItemFn = (props) => <WorkOrdersListItem {...props} />;
