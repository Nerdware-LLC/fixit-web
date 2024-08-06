import { isSafeInteger } from "@nerdware/ts-type-safety-utils";
import dayjs, {
  type ConfigType as DayJsCtorParamType,
  type UnitType as DayJsUnitType,
} from "dayjs";

/**
 * Thin wrapper around `dayjs.diff` which uses `dayjs.isValid` to ensure the provided `timestamp`
 * is valid (`dayjs.diff` returns `NaN` if the arg is invalid), and which defaults the `unit` param
 * to `"days"` instead of `"milliseconds"`.
 *
 * > This function does not check if the `timestamp` is in the past — future dates result
 *   in negative numbers.
 */
export const getTimestampAge = (timestamp: DayJsCtorParamType, unit: DayJsUnitType = "days") => {
  if (dayjs(timestamp).isValid()) {
    return dayjs().diff(timestamp, unit);
  }
};

/**
 * When provided with an item that has a `createdAt` timestamp, this function returns the age of
 * the timestamp as an integer in the specified `unit` of measurement (default: `"days"`). If
 * `maybeItem?.createdAt` is not a valid timestamp, nothing is returned.
 *
 * > `dayjs` _truncates_ the result to zero decimal places, so all results are _**rounded down**_.
 */
export const getItemAge = (
  maybeItem?: { createdAt?: DayJsCtorParamType },
  unit: DayJsUnitType = "days"
) => {
  return getTimestampAge(maybeItem?.createdAt, unit);
};

/**
 * Calculates the discounted price based on the provided `price` and `discountPercentage`.
 *
 * > `This function is for DISPLAY PURPOSES ONLY and merely conveys information to the user.
 * >  All pricing/product info is stored and calculated by the backend API.
 * >  Sending invalid pricing/product info to the server results in a 400 response.`
 */
export const calculateDiscountedPrice_FOR_DISPLAY_ONLY = (
  price: number,
  /** The discount % expressed as an integer (`10` = 10% discount). */
  discountPercentageInt: number | null | undefined
) => {
  return isSafeInteger(discountPercentageInt)
    ? price - price * (discountPercentageInt / 100)
    : price;
};
