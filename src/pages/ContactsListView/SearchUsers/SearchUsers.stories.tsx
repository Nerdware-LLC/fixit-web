import { withMockApolloDecorator, type MockApolloDecoratorArgs } from "@/../.storybook/decorators";
import { QUERIES } from "@/graphql/queries";
import { STATIC_MOCK_CONTACTS } from "@/tests/mockItems/staticMockContacts";
import { SearchUsers } from "./SearchUsers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/ContactsListView/SearchUsers",
  component: SearchUsers,
  decorators: [withMockApolloDecorator],
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
          request: { query: QUERIES.SEARCH_FOR_USERS_BY_HANDLE },
          result: {
            data: {
              searchForUsersByHandle: Object.values(STATIC_MOCK_CONTACTS),
            },
          },
        },
      ],
    },
  },
} satisfies Story;
