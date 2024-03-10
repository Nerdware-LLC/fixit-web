import dayjs, {
  type ConfigType as DayJsCtorParamType,
  type UnitType as DayJsUnitType,
} from "dayjs";
import { isValidTimestamp } from "@/utils/typeSafety/dayjs.js";

/**
 * Thin wrapper around `dayjs.diff` which uses `dayjs.isValid` to ensure the provided `timestamp`
 * is valid (`dayjs.diff` returns `NaN` if the arg is invalid), and which defaults the `unit` param to
 * `"days"` instead of `"milliseconds"`.
 *
 * > This function does not check if the `timestamp` is in the past — future dates result
 *   in negative numbers.
 */
export const getTimestampAge = (timestamp: DayJsCtorParamType, unit: DayJsUnitType = "days") => {
  if (isValidTimestamp(timestamp)) {
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
