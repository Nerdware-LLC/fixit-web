import { withHomePageLayoutDecorator } from "@/../.storybook/decorators";
import { CoreItemView } from "@/layouts/CoreItemView";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems/mockWorkOrders.js";
import { workOrderItemViewSX } from "./WorkOrderItemView.jsx";
import { WorkOrderItemViewContent } from "./WorkOrderItemViewContent.jsx";
import { WorkOrderItemViewHeader } from "./WorkOrderItemViewHeader.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/WorkOrderItemView",
  component: CoreItemView,
  decorators: [withHomePageLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CoreItemView>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

// Pick an arbitrary work order from the mock data
const mockWO = MOCK_WORK_ORDERS.myWorkOrders.createdByUser[0];

export const WithMockWorkOrder = {
  args: {
    headerLabel: "Work Order",
    headerComponents: <WorkOrderItemViewHeader workOrder={mockWO} isItemOwnedByUser={true} />,
    sx: workOrderItemViewSX,
    children: <WorkOrderItemViewContent workOrder={mockWO} />,
  },
} satisfies Story;
