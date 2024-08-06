import Box from "@mui/material/Box";
import ConstructionIcon from "@mui/icons-material/Construction";
import { withNavDecorator } from "@/../.storybook/decorators";
import { TABLE_VIEW_DATA_SETS } from "@/layouts/CoreItemsListView/types.js";
import {
  workOrderTableProps,
  type WorkOrderTableRowData,
} from "@/pages/WorkOrdersListView/tableProps.jsx";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems";
import { DataGrid, type DataGridProps } from "./DataGrid.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DataGrid",
  component: DataGrid<WorkOrderTableRowData>,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          margin: "1rem",
          display: "flex",
          height: "90vh",
          minHeight: "21rem", // 336px
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </Box>
    ),
    withNavDecorator,
  ],
  args: {
    /* DataGrid requires its parent node to have explicit dimensions (not %-based), but
    sometimes the Storybook rendering process yields a DataGrid before its Box-decorator-parent
    is rendered with known dimensions, so `logLevel` is false here to silence those warnings.*/
    logLevel: false,
  },
} satisfies Meta<DataGridProps<WorkOrderTableRowData>>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

export const WorkOrdersDemo = {
  args: {
    ...workOrderTableProps,
    rowDataItemName: "Work Orders",
    backgroundIcon: <ConstructionIcon />,
    rows: [
      ...MOCK_WORK_ORDERS.myWorkOrders.createdByUser.map((wo) => ({
        dataSet: TABLE_VIEW_DATA_SETS.SENT,
        ...wo,
      })),
      ...MOCK_WORK_ORDERS.myWorkOrders.assignedToUser.map((wo) => ({
        dataSet: TABLE_VIEW_DATA_SETS.RECEIVED,
        ...wo,
      })),
    ],
  },
} satisfies StoryObj<typeof meta>;

export const Empty = {
  args: {
    ...WorkOrdersDemo.args,
    rows: [],
  },
} satisfies StoryObj<typeof meta>;
