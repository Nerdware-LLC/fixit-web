/**
 * The "safest" way to check for a property's existence is `Object.prototype.hasOwnProperty.call`,
 * but TypeScript inference doesn't work with this method, so this fn also uses _key in obj_ ,
 * which DOES work with TS inference.
 */
export const typeSafePropertyExists = <O extends Record<string, any>, K extends string>(
  object: O,
  key: K
) => {
  return (
    Object.prototype.hasOwnProperty.call(object, key) &&
    key in object &&
    typeof object[key] !== "undefined"
  );
};
