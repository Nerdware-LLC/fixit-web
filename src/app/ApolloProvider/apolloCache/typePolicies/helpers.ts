import type {
  FieldMergeFunction,
  FieldReadFunction,
  FieldFunctionOptions,
} from "@apollo/client/cache";

/**
 * **Type Policy Helpers**
 *
 * @method `mergeArrays()` - Simply merges `incoming` + `existing` arrays.
 *
 * #### Pagination:
 *
 * @method `paginatedMerge()` - Insert the incoming elements in the right places, according to optional GQL-query args `offset` and `limit`.
 * @method `paginatedRead()` - Read from the cache according to optional GQL-query args `offset` and `limit`.
 * @docs https://www.apollographql.com/docs/react/caching/cache-field-behavior/#handling-pagination
 */
export const helpers = {
  mergeArrays: (existing = [], incoming) => [...existing, ...incoming],

  paginatedMerge: (existing = [], incoming, { args }) => {
    // Make a copy of existing array since it can't be mutated directly
    const merged = existing.slice(0);
    // Determine start and end indices
    const { offset: start = 0, limit = incoming.length } = args ?? {};
    const end = start + Math.min(limit, incoming.length);
    // Replace and/or add new elements to existing array
    for (let i = start; i < end; ++i) {
      merged[i] = incoming[i - start];
    }
    // Return merged array
    return merged;
  },

  paginatedRead: (existing = [], { args }) => {
    const { offset: start = 0, limit = existing.length } = args ?? {};
    // If existing is empty/undefined, or offset >= existing.length, this function
    // returns undefined to indicate that the field is missing (or args are invalid).
    if (existing.length > 0 && start < existing.length) {
      const page = existing.slice(start, start + limit);
      // Sanity check: only return page if it contains data, else return undefined
      if (page.length > 0) return page;
    }
  },
} as const satisfies {
  mergeArrays: ArrayFieldMergeFunction;
  paginatedMerge: ArrayFieldMergeFunction;
  paginatedRead: ArrayFieldReadFn;
};

/**
 * Apollo's {@link FieldMergeFunction} with array-specific default type params.
 */
type ArrayFieldMergeFunction<
  TypeExisting extends unknown[] = unknown[],
  TypeReadResult = TypeExisting,
  TypeOpts extends ArrayFieldFnBaseOpts = ArrayFieldFnBaseOpts,
> = FieldMergeFunction<TypeExisting, TypeReadResult, TypeOpts>;

/**
 * Apollo's {@link FieldReadFunction} with array-specific default type params.
 */
type ArrayFieldReadFn<
  TypeExisting extends unknown[] = unknown[],
  TypeReadResult = TypeExisting,
  TypeOpts extends ArrayFieldFnBaseOpts = ArrayFieldFnBaseOpts,
> = FieldReadFunction<TypeExisting, TypeReadResult, TypeOpts>;

/**
 * Base type for array type-policy read-function param: `options`
 */
type ArrayFieldFnBaseOpts = FieldFunctionOptions<
  ArrayTypePolicyPaginationArgs, // <-- read fn param "options.args"
  Record<string, unknown> //        <-- read fn param "options.vars"
>;

/**
 * Base type for array type-policy read-function param: `options.args`
 */
type ArrayTypePolicyPaginationArgs = {
  offset?: number;
  limit?: number;
  [key: string]: unknown;
};
