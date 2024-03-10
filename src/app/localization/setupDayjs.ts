import "dayjs/locale/en";
import dayjs from "dayjs";
import advancedFormatDayJsPlugin from "dayjs/plugin/advancedFormat";
import isBetweenDayJsPlugin from "dayjs/plugin/isBetween";
import localizedFormatDayJsPlugin from "dayjs/plugin/localizedFormat";

// DayJS Plugins:

dayjs.extend(advancedFormatDayJsPlugin); //  provides 1-24 hour format used by logger util
dayjs.extend(isBetweenDayJsPlugin); //       provides isBetween() method used by Dashboard itemDataParsers
dayjs.extend(localizedFormatDayJsPlugin); // provides local date format used in CheckoutPage
