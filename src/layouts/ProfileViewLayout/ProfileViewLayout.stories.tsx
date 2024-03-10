import { withHomePageLayoutDecorator } from "@/../.storybook/decorators";
import { STATIC_MOCK_USERS } from "@/tests/mockItems/staticMockUsers";
import { ProfileViewLayout } from "./ProfileViewLayout";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layouts/ProfileViewLayout",
  component: ProfileViewLayout,
  decorators: [withHomePageLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProfileViewLayout>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    ...STATIC_MOCK_USERS.Guy_McPerson,
  },
} satisfies Story;

const addLongString = (baseStr: string) => baseStr + "-fooLongString".repeat(20);

export const LongStringValues = {
  args: {
    ...STATIC_MOCK_USERS.Guy_McPerson,
    handle: addLongString(STATIC_MOCK_USERS.Guy_McPerson.handle),
    profile: {
      ...STATIC_MOCK_USERS.Guy_McPerson.profile,
      displayName: addLongString(STATIC_MOCK_USERS.Guy_McPerson.profile.displayName),
      businessName: addLongString(STATIC_MOCK_USERS.Guy_McPerson.profile.businessName),
    },
  },
} satisfies Story;
