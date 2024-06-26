import { HomePageLayout } from "@/layouts/HomePageLayout/HomePageLayout.jsx";
import { RootAppLayout } from "@/layouts/RootAppLayout/RootAppLayout.jsx";
import { MockRouter } from "@/tests/mockProviders/MockRouter.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { Args, PartialStoryFn } from "@storybook/types";

/**
 * This `decorator` causes the `Story` to be rendered within the
 * {@link RootAppLayout|`RootAppLayout`} (uses {@link MockRouter|`MockRouter`}).
 *
 * > **Usage Notes:**
 * > - This `decorator` does not accept any arguments - for custom `routes` and/or related
 * >   args, use `withNavDecorator`.
 * > - For views/layouts/pages which require payment authorization (e.g., `DashboardPage`)
 *     use {@link withHomePageLayoutDecorator|`withHomePageLayoutDecorator`}.
 */
export const withRootAppLayoutDecorator = <StoryArgs extends Args>(
  Story: PartialStoryFn<ReactRenderer, StoryArgs>
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
  />
);

/**
 * This `decorator` causes the `Story` to be rendered within the
 * {@link RootAppLayout|`RootAppLayout`} and {@link HomePageLayout|`HomePageLayout`}
 * (uses {@link MockRouter|`MockRouter`}).
 *
 * > **Usage Notes:**
 * > - This `decorator` does not accept any arguments - for custom `routes` and/or related
 * >   args, use `withNavDecorator`.
 * > - For views/layouts/pages which _do not_ require payment authorization (e.g., `LandingPage`)
 *     use {@link withRootAppLayoutDecorator|`withRootAppLayoutDecorator`}.
 */
export const withHomePageLayoutDecorator = <StoryArgs extends Args>(
  Story: PartialStoryFn<ReactRenderer, StoryArgs>
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
  />
);
