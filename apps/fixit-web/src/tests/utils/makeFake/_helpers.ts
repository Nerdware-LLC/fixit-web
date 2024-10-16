import { isPlainObject, isString } from "@nerdware/ts-type-safety-utils";

export const getMakeFakeFn = <T extends Record<string, unknown>>(
  overrideObjectKey: keyof T,
  makeFake: () => string
) => {
  return (override?: string | Partial<T>): string => {
    const overrideValue = isPlainObject(override) ? override[overrideObjectKey] : undefined;

    return isString(overrideValue) ? overrideValue : isString(override) ? override : makeFake();
  };
};
