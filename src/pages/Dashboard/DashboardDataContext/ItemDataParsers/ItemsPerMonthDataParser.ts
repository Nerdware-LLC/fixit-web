import dayjs from "dayjs";
import type {
  ItemDataParser,
  DataParserItem,
  DataParserAccum,
  DataParserAccumUpdater,
} from "./ItemDataParser.js";

export interface ItemsPerMonthDataParserItem extends DataParserItem {
  createdAt: Date;
}

export type ItemsPerMonthAccumObject = Record<MonthStartTimestamp, number>;

export interface ItemsPerMonthDataParserAccum extends DataParserAccum {
  MONTH_COUNTS: Record<MonthStartTimestamp, number>;
}

/**
 * A timestamp representing the first millisecond of a month.
 */
export type MonthStartTimestamp = number;

/**
 * An array of 12 `MonthStartTimestamp`s, one for each of the last 12 months.
 */
export type MonthStartTimestamps = Array<MonthStartTimestamp>;

/**
 * This `ItemDataParser` implementation is used to count the number of items
 * created per month over the last 12 months using `item.createdAt` values.
 *
 * All `ItemsPerMonthDataParser` instances share the same `initialDataAccum` and
 * `dataAccumUpdater`, so this implementation makes them static members.
 */
export class ItemsPerMonthDataParser
  implements ItemDataParser<ItemsPerMonthDataParserItem, ItemsPerMonthDataParserAccum>
{
  // STATIC MEMBERS:
  static monthStartTimestamps: MonthStartTimestamps;
  static initialDataAccum: ItemsPerMonthDataParserAccum;
  static dataAccumUpdater: DataParserAccumUpdater<
    ItemsPerMonthDataParserItem,
    ItemsPerMonthDataParserAccum
  >;

  /**
   * Returns an integer timestamp equal to the first millisecond of the month of the
   * given dayjs `date` object.
   */
  static getMonthStartTimestamp = (date: dayjs.Dayjs) => {
    return date.date(1).hour(0).minute(0).second(0).millisecond(0).valueOf();
  };

  // Initialize the `initialDataAccum` and `dataAccumUpdater` static members:
  static {
    ItemsPerMonthDataParser.monthStartTimestamps = [];

    for (
      let iterDayjsObj = dayjs();
      ItemsPerMonthDataParser.monthStartTimestamps.length < 12;
      iterDayjsObj = iterDayjsObj.subtract(1, "month")
    ) {
      ItemsPerMonthDataParser.monthStartTimestamps.push(
        ItemsPerMonthDataParser.getMonthStartTimestamp(iterDayjsObj)
      );
    }

    ItemsPerMonthDataParser.initialDataAccum = {
      MONTH_COUNTS: Object.fromEntries(
        ItemsPerMonthDataParser.monthStartTimestamps.map((monthStartTimestamp) => [
          monthStartTimestamp,
          0,
        ])
      ),
    };

    // The lowest monthStartTimestamp is the oldest month we want to include
    const oldestMonthStartTimestamp = Math.min(...ItemsPerMonthDataParser.monthStartTimestamps);
    // Convert to dayjs object and subtract 1 month to use in `isAfter` comparison
    const maxItemAgeDayjsObj = dayjs(oldestMonthStartTimestamp).subtract(1, "month");

    ItemsPerMonthDataParser.dataAccumUpdater = (dataReducerAccum, item) => {
      const createdAtMoment = dayjs(item.createdAt);
      // If `createdAt` is older than 1 year, don't include in MONTH_COUNTS
      if (createdAtMoment.isAfter(maxItemAgeDayjsObj, "month")) {
        dataReducerAccum.MONTH_COUNTS[
          ItemsPerMonthDataParser.getMonthStartTimestamp(createdAtMoment)
        ] += 1;
      }

      return dataReducerAccum;
    };
  }

  // INSTANCE ItemDataParser PROPERTIES SIMPLY RETURN THE STATIC MEMBERS:
  initialDataAccum = ItemsPerMonthDataParser.initialDataAccum;
  dataAccumUpdater = ItemsPerMonthDataParser.dataAccumUpdater;

  constructor() {
    this.initialDataAccum = { ...ItemsPerMonthDataParser.initialDataAccum };
    this.dataAccumUpdater = ItemsPerMonthDataParser.dataAccumUpdater;
  }
}
