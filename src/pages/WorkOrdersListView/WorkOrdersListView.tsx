import ConstructionIcon from "@mui/icons-material/Construction";
import { CreateItemButton } from "@/components/Buttons/CreateItemButton.jsx";
import { WorkOrderListItemButton } from "@/components/List/listItems/WorkOrderListItem.jsx";
import { QUERIES } from "@/graphql/queries.js";
import {
  CoreItemsListView,
  LIST_VIEW_LIST_NAMES,
  TABLE_VIEW_DATA_SETS,
  type ListViewRenderItemFn,
} from "@/layouts/CoreItemsListView";
import { APP_PATHS } from "@/routes/appPaths.js";
import { workOrderTableProps, type WorkOrderTableRowData } from "./tableProps.js";
import type { WorkOrder, MyWorkOrdersQueryResponse } from "@/types/graphql.js";

type MyWorkOrdersQueryData = { myWorkOrders: MyWorkOrdersQueryResponse };

const getListsAndTablePropsFromMyWorkOrders = (data: MyWorkOrdersQueryData) => {
  const workOrdersCreatedByUser = data.myWorkOrders.createdByUser;
  const workOrdersAssignedToUser = data.myWorkOrders.assignedToUser;
  return {
    lists: [
      {
        listName: LIST_VIEW_LIST_NAMES.INBOX,
        items: workOrdersAssignedToUser,
        listComponentProps: {
          EmptyPlaceholder: {
            text: "Your Work Orders Inbox is Empty",
            tooltip: "Work Orders you receive from others will appear here",
            backgroundIcon: <ConstructionIcon />,
          },
        },
      },
      {
        listName: LIST_VIEW_LIST_NAMES.SENT,
        items: workOrdersCreatedByUser,
        listComponentProps: {
          EmptyPlaceholder: {
            text: "Your List of Sent Work Orders is Empty",
            tooltip: "Work Orders you send to others will appear here",
            backgroundIcon: <ConstructionIcon />,
          },
        },
      },
    ],
    tableProps: {
      ...workOrderTableProps,
      backgroundIcon: <ConstructionIcon />,
      rows: [
        ...workOrdersCreatedByUser.map((wo) => ({
          dataSet: TABLE_VIEW_DATA_SETS.SENT,
          ...wo,
        })),
        ...workOrdersAssignedToUser.map((wo) => ({
          dataSet: TABLE_VIEW_DATA_SETS.RECEIVED,
          ...wo,
        })),
      ],
    },
  };
};

const renderWorkOrdersListItem: ListViewRenderItemFn<WorkOrder> = ({ listName, item, onClick }) => (
  <WorkOrderListItemButton
    workOrder={item}
    onClick={onClick}
    data-item-id={item.id}
    userToDisplay={listName === LIST_VIEW_LIST_NAMES.INBOX ? item.createdBy : item.assignedTo}
    // userToDisplay is the other user
  />
);

export const WorkOrdersListView = () => (
  <CoreItemsListView<MyWorkOrdersQueryData, WorkOrder, WorkOrderTableRowData>
    listQuery={QUERIES.MY_WORK_ORDERS}
    getListsAndTableProps={getListsAndTablePropsFromMyWorkOrders}
    headerLabel="Work Orders"
    headerComponents={
      <CreateItemButton
        createItemFormPath={APP_PATHS.WORK_ORDERS_FORM_VIEW}
        buttonText="Create Work Order"
      />
    }
    itemViewBasePath={APP_PATHS.WORK_ORDERS_LIST_VIEW}
    listViewSettingsStoreKey="workOrders"
    renderItem={renderWorkOrdersListItem}
  />
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = WorkOrdersListView;
