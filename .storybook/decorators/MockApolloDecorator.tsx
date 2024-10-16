import { useEffect } from "react";
import { apolloCache } from "@/app/ApolloProvider/apolloCache";
import {
  MockApolloProvider,
  type MockApolloProviderProps,
} from "@/tests/mockProviders/MockApolloProvider.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction, Args } from "@storybook/types";
import type { SetOptional } from "type-fest";

/**
 * Args for {@link MockApolloDecorator} functions.
 */
export type MockApolloDecoratorArgs = {
  _mock_apollo_decorator_args?: SetOptional<MockApolloProviderProps, "children">;
};

/**
 * A `decorator` that wraps a `Story` in a {@link MockApolloProvider}.
 */
type MockApolloDecorator = DecoratorFunction<ReactRenderer, Args & MockApolloDecoratorArgs>;

/**
 * This `decorator` wraps a `Story` in a {@link MockApolloProvider}.
 *
 * > ## Fetch Policy: `"cache-only"`
 * >
 * > If a component uses a `"cache-only"` fetchPolicy, rather than providing `mocks` to
 * > `_mock_apollo_decorator_args`, you must import `apolloCache` and use `apolloCache.writeQuery`
 * > to write the relevant query-data to the cache.
 */
export const withMockApolloDecorator: MockApolloDecorator = (
  Story,
  { args: { _mock_apollo_decorator_args: mockApolloDecoratorArgs = {} } }
) => {
  /* EFFECT: Evict all items from the cache to ensure it doesn't contain
  stale data from previous stories that utilize this decorator. */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    apolloCache.evict({});
  }, []);

  return (
    <MockApolloProvider cache={apolloCache} {...mockApolloDecoratorArgs}>
      <Story />
    </MockApolloProvider>
  );
};
