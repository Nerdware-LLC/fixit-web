import moment from "moment";
import type { MomentInput, unitOfTime } from "moment";

// NOTE: These fns are currently not exported from utils/ (only used in utils/formUtils atm)

const DEFAULT_DATETIME_FORMATS = {
  date: "M/D/Y",
  shortDate: "MMM Do",
  longDate: "dddd, MMMM Do, Y",
  time: "h:mm A",
  dateAndTime: "M/D/Y h:mm a"
};

/**
 * Get a MomentJS-formatted dateTime string.
 * - Default format: `"h:mm A"`
 */
export const getTime = (dateTime: MomentInput, format = DEFAULT_DATETIME_FORMATS.time) => {
  return moment(dateTime).format(format);
};

/**
 * Get a MomentJS-formatted dateTime string.
 * - Default format: `"M/D/Y"`
 */
export const getDate = (dateTime: MomentInput, format = DEFAULT_DATETIME_FORMATS.date) => {
  return moment(dateTime).format(format);
};

/**
 * Get a MomentJS-formatted dateTime string.
 * - Default format: `"M/D/Y h:mm a"`
 */
export const getDateAndTime = (
  dateTime: MomentInput,
  format = DEFAULT_DATETIME_FORMATS.dateAndTime
) => {
  return moment(dateTime).format(format);
};

/**
 * Compares two moment-inputs and returns a boolean indicating whether or not
 * they represent the same date and time.
 * - granularity default: `"day"`
 */
export const areSameDateTimes = (
  dateTime1: MomentInput,
  dateTime2: MomentInput,
  granularity: unitOfTime.StartOf = "day"
) => {
  return moment(dateTime1).isValid() && moment(dateTime2).isValid()
    ? moment(dateTime1).isSame(dateTime2, granularity)
    : false;
};
