import {
  withNavDecorator,
  withAppStateInfoDecorator,
  type AppStateInfoDecoratorArgs,
} from "@/../.storybook/decorators";
import { QUERIES } from "@/graphql/queries.js";
import { STATIC_MOCK_USERS } from "@/tests/mockItems/staticMockUsers.js";
import { MobileAppBarMenu } from "./MobileAppBarMenu.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/AppBar/MobileAppBarMenu",
  component: MobileAppBarMenu,
  decorators: [withNavDecorator, withAppStateInfoDecorator],
  args: {
    _mock_apollo_decorator_args: {
      mocks: [
        {
          request: { query: QUERIES.MY_PROFILE },
          result: {
            data: {
              myProfile: STATIC_MOCK_USERS.Guy_McPerson.profile,
            },
          },
        },
      ],
    },
  },
} satisfies Meta<AppStateInfoDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;
export const UserNotAuthenticated = {
  args: {
    _app_state_info_decorator_args: {
      appState: {
        isUserAuthenticated: false,
        isAccountActive: false,
        isConnectOnboardingComplete: false,
      },
    },
  },
} satisfies Story;

export const InactiveSubscription = {
  args: {
    _app_state_info_decorator_args: {
      appState: {
        isUserAuthenticated: true,
        isAccountActive: false,
        isConnectOnboardingComplete: false,
      },
    },
  },
} satisfies Story;

export const StripeConnectOnboardingIncomplete = {
  args: {
    _app_state_info_decorator_args: {
      appState: {
        isUserAuthenticated: true,
        isAccountActive: true,
        isConnectOnboardingComplete: false,
      },
    },
  },
} satisfies Story;

export const FullyOnboardedActiveUser = {
  args: {
    _app_state_info_decorator_args: {
      appState: {
        isUserAuthenticated: true,
        isAccountActive: true,
        isConnectOnboardingComplete: true,
      },
    },
  },
} satisfies Story;
