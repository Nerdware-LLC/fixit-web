import { useEffect } from "react";
import { apolloCache } from "@/app/ApolloProvider/apolloCache";
import {
  MockApolloProvider,
  type MockApolloProviderProps,
} from "@/tests/mockProviders/MockApolloProvider";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args } from "@storybook/types";
import type { SetOptional } from "type-fest";

/**
 * This `decorator` wraps a `Story` in a {@link MockApolloProvider|`MockApolloProvider`}.
 *
 * ### Fetch Policy: `"cache-only"`
 *
 * If a component uses a `"cache-only"` fetchPolicy, rather than providing `mocks` to
 * `_mock_apollo_decorator_args`, you must import `apolloCache` and use `apolloCache.writeQuery`
 * to write the relevant query-data to the cache.
 */
export const withMockApolloDecorator: DecoratorFunction<
  ReactRenderer,
  Args & MockApolloDecoratorArgs
> = (Story, { args: { _mock_apollo_decorator_args: mockApolloDecoratorArgs = {} } }) => {
  /* EFFECT: Evict all items from the cache to ensure it doesn't contain
  stale data from previous stories that utilize this decorator. */
  useEffect(() => {
    apolloCache.evict({});
  }, []);

  return (
    <MockApolloProvider cache={apolloCache} {...mockApolloDecoratorArgs}>
      <Story />
    </MockApolloProvider>
  );
};

/**
 * {@link withMockApolloDecorator} passes all values nested under `_mock_apollo_decorator_args` to
 * the {@link MockApolloProvider} component decorator.
 */
export type MockApolloDecoratorArgs = {
  _mock_apollo_decorator_args?: SetOptional<MockApolloProviderProps, "children">;
};
