import {
  withMockApolloDecorator,
  withHomePageLayoutDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { QUERIES } from "@/graphql/queries";
import { MOCK_INVOICES } from "@/tests/mockItems/mockInvoices";
import { InvoicesListView } from "./InvoicesListView";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/InvoicesListView",
  component: InvoicesListView,
  decorators: [withHomePageLayoutDecorator, withMockApolloDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<MockApolloDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const WithMockInvoices = {
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_INVOICES },
          result: { data: MOCK_INVOICES },
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
          request: { query: QUERIES.MY_INVOICES },
          result: {
            data: {
              myInvoices: {
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
