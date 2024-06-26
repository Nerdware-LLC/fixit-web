import { MockRouter, type MockRouterProps } from "@/tests/mockProviders/MockRouter.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args, PartialStoryFn, StoryContext } from "@storybook/types";
import type { SetOptional } from "type-fest";

/**
 * This `decorator` wraps a `Story` in a {@link MockRouter|`MockRouter`}
 */
export const withNavDecorator = <StoryArgs extends Args>(
  Story: PartialStoryFn<ReactRenderer, StoryArgs & NavDecoratorArgs>,
  {
    args: { _nav_decorator_args: navDecoratorArgs = {} },
  }: StoryContext<ReactRenderer, StoryArgs & NavDecoratorArgs>
) => (
  <MockRouter {...navDecoratorArgs}>
    <Story />
  </MockRouter>
);

// Ensure `withNavDecorator` satisfies the `DecoratorFunction` type:
withNavDecorator satisfies DecoratorFunction<ReactRenderer, Args & NavDecoratorArgs>;

/**
 * {@link withNavDecorator} passes all values nested under `_nav_decorator_args` to the
 * {@link MockRouter} component decorator.
 */
export type NavDecoratorArgs = {
  _nav_decorator_args?: SetOptional<MockRouterProps, "children">;
};
