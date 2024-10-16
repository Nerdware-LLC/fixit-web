import { FetchStateContextProvider } from "@/app/FetchStateContext";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { STATIC_MOCK_USERS } from "@/tests/mockItems/staticMockUsers.js";
import { StripeForm } from "./StripeForm.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/StripeForm",
  component: StripeForm,
  decorators: [
    (Story) => (
      <FetchStateContextProvider>
        <Story />
      </FetchStateContextProvider>
    ),
  ],
} satisfies Meta<typeof StripeForm>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

authenticatedUserStore.set(STATIC_MOCK_USERS.Guy_McPerson);

export const PaymentInputDemo = {
  args: {
    stripeElementsOptions: {
      mode: "subscription",
      currency: "usd",
      amount: 1000,
    },
  },
} satisfies Story;
