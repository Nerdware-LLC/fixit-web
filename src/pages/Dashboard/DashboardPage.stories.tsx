import {
  withHomePageLayoutDecorator,
  withMockApolloDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { QUERIES } from "@/graphql/queries";
import { MOCK_INVOICES } from "@/tests/mockItems/mockInvoices";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems/mockWorkOrders";
import { DashboardPage } from "./DashboardPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  decorators: [withHomePageLayoutDecorator, withMockApolloDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<MockApolloDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const WithMockItems = {
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_WORK_ORDERS },
          result: { data: MOCK_WORK_ORDERS },
        },
        {
          request: { query: QUERIES.MY_INVOICES },
          result: { data: MOCK_INVOICES },
        },
      ],
    },
  },
} satisfies Story;

export const EmptyData = {
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_WORK_ORDERS },
          result: { data: [] },
        },
        {
          request: { query: QUERIES.MY_INVOICES },
          result: { data: [] },
        },
      ],
    },
  },
} satisfies Story;
