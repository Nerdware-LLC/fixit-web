import {
  withCheckoutStateDecorator,
  withRootAppLayoutDecorator,
  type CheckoutStateDecoratorArgs,
} from "@/../.storybook/decorators";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore";
import { isAuthenticatedStore } from "@/stores/isAuthenticatedStore";
import { STATIC_MOCK_USERS } from "@/tests/mockItems/staticMockUsers";
import { CheckoutPage, type CheckoutPageProps } from "./CheckoutPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/CheckoutPage",
  component: CheckoutPage,
  decorators: [withRootAppLayoutDecorator, withCheckoutStateDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<CheckoutPageProps & CheckoutStateDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

authenticatedUserStore.set(STATIC_MOCK_USERS.Guy_McPerson as any);
isAuthenticatedStore.set(true);

export const AnnualPricing = {
  args: {
    _checkout_state_decorator_args: {
      checkoutState: {
        selectedSubscription: "ANNUAL",
        promoCode: null,
      },
    },
  },
} satisfies Story;

export const MonthlyPricing = {
  args: {
    _checkout_state_decorator_args: {
      checkoutState: {
        selectedSubscription: "MONTHLY",
        promoCode: null,
      },
    },
  },
} satisfies Story;

export const TrialPricing = {
  args: {
    _checkout_state_decorator_args: {
      checkoutState: {
        selectedSubscription: "TRIAL",
        promoCode: null,
      },
    },
  },
} satisfies Story;

export const PaymentConfirmed = {
  args: {
    ...AnnualPricing.args,
    showPaymentConfirmation: true,
  },
} satisfies Story;
