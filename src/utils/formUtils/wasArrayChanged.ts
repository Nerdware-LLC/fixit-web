import isDeepEqual from "lodash.isequal";
import type {
  OnSubmitFieldMutationProcessorFn,
  OnSubmitFieldMutationProcessorFnReturn,
} from "./types";

/**
 * Compare two nullable array args to determine if their form field should be
 * included in an API mutation payload. The table below shows corresponding
 * return values for each possible set of inputs:
 *
 * | newList              | existingList         |  Send?  | Mutation Type  |
 * | :------------------- | :------------------- | :-----: | :------------- |
 * | `null`               | `null`               | `false` |                |
 * | `Array`              | `null`               | `true`  | "UPDATE"       |
 * | `null`               | `Array`              | `true`  | "DELETE"       |
 * | `Array` (same items) | `Array` (same items) | `false` |                |
 * | `Array`              | `Array`              | `true`  | "UPDATE"       |
 */
export const wasArrayChanged: OnSubmitFieldMutationProcessorFn<Array<any>> = (
  newList?: Array<any> | null,
  existingList?: Array<any> | null
): OnSubmitFieldMutationProcessorFnReturn => {
  /*
    If existingList is falsey/non-array, there are only 2 possible outcomes:
      - If newList is also falsey, RETURN wasChanged=false
      - If newList is an array, RETURN mutationType=UPDATE
  */
  if (!existingList || !Array.isArray(existingList)) {
    return Array.isArray(newList)
      ? { wasChanged: true, mutationType: "UPDATE", value: newList }
      : { wasChanged: false };
  }

  // If existingList isArray AND newList is not, RETURN mutationType=DELETE
  if (!newList || !Array.isArray(newList)) {
    return { wasChanged: true, mutationType: "DELETE", value: null };
  }

  /* At this point we know both args are valid arrays, but before looping
  through both arrays to compare their items, a quick length comparison is
  done to cut down on time-consuming loops.

  If their lengths are NOT equal, RETURN mutationType=UPDATE  */
  if (newList.length !== existingList.length) {
    return { wasChanged: true, mutationType: "UPDATE", value: newList };
  }

  /* Now the equal-length arrays are compared to see if they both contain all
  the same items:
    - Starting with wasChanged=false, each item in newList is checked to see
      if it is in existingList, AND all keys and values are the same.
    - If a newList item is not in existingList, or if any of its keys/values
      are different, wasChanged is flipped to true.
    - Once wasChanged=true, the rest of the items in newList don't need to be
      checked against existingList (this is why `reduce` is used).
  */
  return newList.reduce(
    (accum, newListItem) => {
      if (!accum.wasChanged) {
        // Try to find existingItem with all the same keys and values
        const unchangedExistingItem = existingList.find((existingItem) => {
          // GQL property "__typename" is rm'd since it may cause false negatives
          if (Object.prototype.hasOwnProperty.call(existingItem, "__typename")) {
            delete existingItem.__typename;
          }
          return isDeepEqual(existingItem, newListItem);
        });

        // If an item was changed, update accum
        if (!unchangedExistingItem) {
          accum = { wasChanged: true, mutationType: "UPDATE", value: newList };
        }
      }

      return accum;
    },
    { wasChanged: false } // initial reducer accum
  );
};
