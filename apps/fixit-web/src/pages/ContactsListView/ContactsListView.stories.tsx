import {
  withMockApolloDecorator,
  withHomePageLayoutDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { QUERIES } from "@/graphql/queries.js";
import { MOCK_MY_CONTACTS_RESPONSE } from "@/tests/mockItems/mockContacts.js";
import { ContactsListView } from "./ContactsListView.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/ContactsListView",
  component: ContactsListView,
  decorators: [withHomePageLayoutDecorator, withMockApolloDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<MockApolloDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const WithMockContacts = {
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_CONTACTS },
          result: {
            data: MOCK_MY_CONTACTS_RESPONSE,
          },
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
          request: { query: QUERIES.MY_CONTACTS },
          result: {
            data: {
              myContacts: [],
            },
          },
        },
      ],
    },
  },
} satisfies Story;
