import type {
  FieldMergeFunction,
  FieldReadFunction,
  FieldFunctionOptions,
} from "@apollo/client/cache";

/**
 * A {@link FieldMergeFunction} util which simply merges `incoming` + `existing` arrays.
 */
export const mergeArrays: FieldMergeFunction<Array<unknown>> = (existing = [], incoming) => [
  ...existing,
  ...incoming,
];

/**
 * A {@link FieldMergeFunction} util for paginated queries which merges `incoming` elements into
 * the `existing` cached array by inserting them at the indices indicated by paginated-query args
 * `offset` and `limit`.
 *
 * @docs https://www.apollographql.com/docs/react/caching/cache-field-behavior/#handling-pagination
 */
export const paginatedMerge: FieldMergeFunction<
  Array<unknown>,
  Array<unknown>,
  FieldFunctionOptions<PaginatedQueryBaseArgs>
> = (existing = [], incoming, { args }) => {
  // Make a copy of existing array since it can't be mutated directly
  const merged = existing.slice(0);

  // Determine start and end indices
  const { offset: start = 0, limit = incoming.length } = args ?? {};
  const end = start + Math.min(limit, incoming.length);

  // Replace and/or add new elements to the existing array
  for (let i = start; i < end; ++i) {
    merged[i] = incoming[i - start];
  }

  // Return merged array
  return merged;
};

/**
 * A {@link FieldReadFunction} util for paginated queries which reads paginated elements
 * from the `existing` cached array using paginated-query args `offset` and `limit`.
 *
 * @docs https://www.apollographql.com/docs/react/caching/cache-field-behavior/#handling-pagination
 */
export const paginatedRead: FieldReadFunction<
  Array<unknown>,
  Array<unknown>,
  FieldFunctionOptions<PaginatedQueryBaseArgs>
> = (existing = [], { args }) => {
  const { offset: start = 0, limit = existing.length } = args ?? {};
  // If existing is empty/undefined, or offset >= existing.length, this function
  // returns undefined to indicate that the field is missing (or args are invalid).
  if (existing.length > 0 && start < existing.length) {
    const page = existing.slice(start, start + limit);
    // Sanity check: only return page if it contains data, else return undefined
    if (page.length > 0) return page;
  }
};

/**
 * Base type for the `options.args` param of array-based `read` and/or `merge` field policy fns.
 */
type PaginatedQueryBaseArgs = {
  [key: string]: unknown;
  /** The index at which to start processing elements ( _optional_, default: `0`). */
  offset?: number;
  /** The maximum number of elements to return ( _optional_ ). */
  limit?: number;
};
