import { checkoutValuesStore, type CheckoutValues } from "@/stores";
import { MockApolloProvider } from "@/tests/mockProviders/MockApolloProvider";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args, PartialStoryFn, StoryContext } from "@storybook/types";
import type { SetOptional } from "type-fest";
import type { MockApolloDecoratorArgs } from "./MockApolloDecorator";

const CheckoutStateDecorator = ({
  checkoutState: { selectedSubscription, promoCode = null, discountPercentage = null },
  children, // <-- the story
}: CheckoutStateDecoratorProps & { children: React.ReactNode }) => {
  checkoutValuesStore.set({ selectedSubscription, promoCode, discountPercentage });
  return children;
};

/**
 * This `decorator` wraps a `Story` in an {@link CheckoutStateDecorator} component,
 * as well as a {@link MockApolloProvider} (required for the Apollo reactive-vars).
 */
export const withCheckoutStateDecorator = <StoryArgs extends Args>(
  storyFn: PartialStoryFn<ReactRenderer, StoryArgs & CheckoutStateDecoratorArgs>,
  {
    args: {
      _checkout_state_decorator_args: checkoutStateDecoratorArgs,
      _mock_apollo_decorator_args: mockApolloDecoratorArgs = {},
    },
  }: StoryContext<ReactRenderer, StoryArgs & CheckoutStateDecoratorArgs>
) => (
  <MockApolloProvider {...mockApolloDecoratorArgs}>
    <CheckoutStateDecorator {...checkoutStateDecoratorArgs}>{storyFn()}</CheckoutStateDecorator>
  </MockApolloProvider>
);

// Ensure `withCheckoutStateDecorator` satisfies the `DecoratorFunction` type:
withCheckoutStateDecorator satisfies DecoratorFunction<
  ReactRenderer,
  Args & CheckoutStateDecoratorArgs
>;

export type CheckoutStateDecoratorProps = {
  checkoutState: SetOptional<CheckoutValues, "promoCode" | "discountPercentage">;
};

/**
 * {@link withCheckoutStateDecorator} passes all values nested under
 * `_checkout_state_decorator_args` to the {@link CheckoutStateInfoDecorator} component.
 */
export type CheckoutStateDecoratorArgs = {
  _checkout_state_decorator_args: CheckoutStateDecoratorProps;
} & MockApolloDecoratorArgs;
