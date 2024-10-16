import { HomePageLayout } from "@/layouts/HomePageLayout/HomePageLayout.jsx";
import { RootAppLayout } from "@/layouts/RootAppLayout/RootAppLayout.jsx";
import { MockRouter, type MockRouterProps } from "@/tests/mockProviders/MockRouter.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args, PartialStoryFn, StoryContext } from "@storybook/types";
import type { SetOptional, Except } from "type-fest";

/**
 * Args for {@link LayoutDecorator} functions.
 */
export type LayoutDecoratorArgs = {
  _layout_decorator_args?: SetOptional<Except<MockRouterProps, "route" | "routes">, "children">;
};

/**
 * A `decorator` that wraps a `Story` in a layout component.
 */
type LayoutDecorator = DecoratorFunction<ReactRenderer, Args & LayoutDecoratorArgs>;

/**
 * This `decorator` causes the `Story` to be rendered within the {@link RootAppLayout} component.
 *
 * > For views/layouts/pages which require payment authorization (e.g., `DashboardPage`),
 *   use {@link withHomePageLayoutDecorator}.
 */
export const withRootAppLayoutDecorator = <StoryArgs extends Args>(
  Story: PartialStoryFn<ReactRenderer, StoryArgs & LayoutDecoratorArgs>,
  {
    args: { _layout_decorator_args: layoutDecoratorArgs = {} },
  }: StoryContext<ReactRenderer, StoryArgs & LayoutDecoratorArgs>
) => (
  <MockRouter
    routes={[
      {
        element: <RootAppLayout />,
        children: [
          {
            path: "*",
            element: <Story />,
          },
        ],
      },
    ]}
    {...layoutDecoratorArgs}
  />
);

// Using `satisfies` avoids forcing stories to use `LayoutDecoratorArgs` in their `Meta` type
withRootAppLayoutDecorator satisfies LayoutDecorator;

/**
 * This `decorator` causes the `Story` to be rendered within the {@link RootAppLayout}
 * and {@link HomePageLayout} components.
 *
 * > For views/layouts/pages which _do not_ require payment authorization (e.g., `LandingPage`),
 *   use {@link withRootAppLayoutDecorator}.
 */
export const withHomePageLayoutDecorator = <StoryArgs extends Args>(
  Story: PartialStoryFn<ReactRenderer, StoryArgs & LayoutDecoratorArgs>,
  {
    args: { _layout_decorator_args: layoutDecoratorArgs = {} },
  }: StoryContext<ReactRenderer, StoryArgs & LayoutDecoratorArgs>
) => (
  <MockRouter
    routes={[
      {
        element: <RootAppLayout />,
        children: [
          {
            element: <HomePageLayout />,
            children: [
              {
                path: "*",
                element: <Story />,
              },
            ],
          },
        ],
      },
    ]}
    {...layoutDecoratorArgs}
  />
);

// Using `satisfies` avoids forcing stories to use `LayoutDecoratorArgs` in their `Meta` type
withHomePageLayoutDecorator satisfies LayoutDecorator;
