import dayjs, { type ConfigType as DayJsInputType, type UnitType } from "dayjs";

const DEFAULT_DATETIME_FORMATS = {
  date: "M/D/YY",
  shortDate: "MMM Do",
  longDate: "dddd, MMMM Do, YYYY",
  time: "h:mm A",
  dateAndTime: "M/D/YY h:mm a",
};

/**
 * Get a DayJS-formatted dateTime string.
 * - Default format: `"h:mm A"`
 */
export const getTime = (dateTime: DayJsInputType, format = DEFAULT_DATETIME_FORMATS.time) => {
  return dayjs(dateTime).format(format);
};

/**
 * Get a DayJS-formatted dateTime string.
 * - Default format: `"M/D/Y"`
 */
export const getDate = (dateTime: DayJsInputType, format = DEFAULT_DATETIME_FORMATS.date) => {
  return dayjs(dateTime).format(format);
};

/**
 * Get a DayJS-formatted dateTime string.
 * - Default format: `"M/D/Y h:mm a"`
 */
export const getDateAndTime = (
  dateTime: DayJsInputType,
  format = DEFAULT_DATETIME_FORMATS.dateAndTime
) => {
  return dayjs(dateTime).format(format);
};

/**
 * Compares two dayjs-inputs and returns a boolean indicating whether or not
 * they represent the same date and time.
 * - granularity default: `"day"`
 */
export const areSameDateTimes = (
  dateTime1: DayJsInputType,
  dateTime2: DayJsInputType,
  granularity: UnitType = "day"
) => {
  return dayjs(dateTime1).isValid() && dayjs(dateTime2).isValid()
    ? dayjs(dateTime1).isSame(dateTime2, granularity)
    : false;
};
