import {
  withMockApolloDecorator,
  withHomePageLayoutDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { QUERIES } from "@/graphql/queries";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems/mockWorkOrders";
import { WorkOrdersListView } from "./WorkOrdersListView";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/WorkOrdersListView",
  component: WorkOrdersListView,
  decorators: [withHomePageLayoutDecorator, withMockApolloDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<MockApolloDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const WithMockWorkOrders = {
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_WORK_ORDERS },
          result: { data: MOCK_WORK_ORDERS },
        },
      ],
    },
  },
} satisfies Story;

export const EmptyList = {
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_WORK_ORDERS },
          result: {
            data: {
              myWorkOrders: {
                createdByUser: [],
                assignedToUser: [],
              },
            },
          },
        },
      ],
    },
  },
} satisfies Story;
