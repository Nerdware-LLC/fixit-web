import { MockRouter, type MockRouterProps } from "@/tests/mockProviders/MockRouter.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args, PartialStoryFn, StoryContext } from "@storybook/types";
import type { SetOptional } from "type-fest";

/**
 * Args for {@link NavDecorator} functions.
 */
export type NavDecoratorArgs = {
  _nav_decorator_args?: SetOptional<MockRouterProps, "children">;
};

/**
 * A `decorator` that wraps a `Story` in a {@link MockRouter} component.
 */
type NavDecorator = DecoratorFunction<ReactRenderer, Args & NavDecoratorArgs>;

/**
 * This `decorator` wraps a `Story` in a {@link MockRouter}.
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

// Using `satisfies` avoids forcing stories to use `NavDecoratorArgs` in their `Meta` type
withNavDecorator satisfies NavDecorator;
