import type { Primitive } from "type-fest";

/**
 * This function creates a same-type deep copy of the input without using methods
 * like `JSON.parse(JSON.stringify(input))` which can't handle certain types of
 * data like `undefined`, `null`, `Date`, `Map`s, etc.
 *
 * > Note: The `structuredClone` Web API method is a better alternative to this
 *   implementation, but as of May 2023, it's only supported in the very latest
 *   versions of some browsers like Chrome and Safari, _and_ the Nodejs version
 *   used in the dev-env would have to be bumped to at least v17 as well. Until
 *   these compatibility issues are resolved, use this function instead.
 */
export const deepCopy = <T extends DeepCopyInput>(input: T): T => {
  return typeof input === "bigint" ||
    typeof input === "boolean" ||
    typeof input === "number" ||
    typeof input === "string" ||
    typeof input === "symbol" ||
    typeof input === "undefined" ||
    input === null
    ? input // else typeof input is "object"
    : input instanceof Date
    ? (new Date(input.getTime()) as T)
    : input instanceof Map
    ? (new Map(Array.from(input).map(([key, value]) => [deepCopy(key), deepCopy(value)])) as T)
    : input instanceof Set
    ? (new Set(Array.from(input).map((item) => deepCopy(item))) as T)
    : Array.isArray(input)
    ? (input.map((item) => deepCopy(item)) as T)
    : (Object.fromEntries(
        Object.entries(input).map(([key, value]) => [key, deepCopy(value)])
      ) as T);
};

export type DeepCopyInput =
  | Primitive
  | Date
  | Map<DeepCopyInput, DeepCopyInput>
  | Set<DeepCopyInput>
  | Array<DeepCopyInput>
  | Record<PropertyKey, any>;
