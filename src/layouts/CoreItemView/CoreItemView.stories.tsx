import { withHomePageLayoutDecorator } from "@/../.storybook/decorators";
import { CoreItemView } from "@/layouts/CoreItemView";
import { workOrderItemViewSX } from "@/pages/WorkOrderItemView/WorkOrderItemView";
import { WorkOrderItemViewContent } from "@/pages/WorkOrderItemView/WorkOrderItemViewContent";
import { WorkOrderItemViewHeader } from "@/pages/WorkOrderItemView/WorkOrderItemViewHeader";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems/mockWorkOrders";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layouts/CoreItemView",
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
    headerLabel: "Core Fixit Item",
    headerComponents: <WorkOrderItemViewHeader workOrder={mockWO} isItemOwnedByUser={true} />,
    sx: workOrderItemViewSX,
    children: <WorkOrderItemViewContent workOrder={mockWO} />,
  },
} satisfies Story;
