import moment from "moment";
import { ItemDataParser } from "./ItemDataParser";
import type { WorkOrder, Invoice } from "@types";

export class ItemsPerMonthCountDataParser<
  TItem extends WorkOrder | Invoice
> extends ItemDataParser<TItem> {
  // private member for caching monthLabels
  private static _monthLabels: Array<string> = [];

  /**
   * An array of month-label strings in the format of `"MMM 'YY"` covering the
   * last 12 months (the current month and 11 preceding months, in order).
   */
  static get monthLabels() {
    // Return cached value if exists, else calculate, cache, then return
    if (this._monthLabels.length !== 12) {
      let monthLabels: MonthLabels = [];

      for (let iterMoment = moment(); monthLabels.length < 12; iterMoment.subtract(1, "month")) {
        monthLabels.push(iterMoment.format("MMM 'YY"));
      }

      this._monthLabels = monthLabels.reverse();
    }

    return this._monthLabels;
  }

  constructor(
    monthLabels: Array<MonthLabel> = ItemsPerMonthCountDataParser.monthLabels,
    maxItemAgeMoment: moment.Moment = moment().subtract(1, "year") // default: 1 year ago
  ) {
    super({
      initialDataAccum: {
        MONTH_COUNTS: Object.fromEntries(monthLabels.map((month) => [month, 0]))
      },
      dataAccumUpdater: (dataReducerAccum, item) => {
        const createdAtMoment = moment(item.createdAt);
        // If `createdAt` is older than 1 year, don't include in MONTH_COUNTS
        if (createdAtMoment.isAfter(maxItemAgeMoment, "month")) {
          // The MomentJS "MMM 'YY" format matches the short-names in the accum
          const createdAtShortName: MonthLabel = createdAtMoment.format("MMM 'YY");
          dataReducerAccum.MONTH_COUNTS[createdAtShortName] += 1;
        }

        return dataReducerAccum;
      }
    });
  }
}

export type MonthLabels = typeof ItemsPerMonthCountDataParser.monthLabels;
export type MonthLabel = MonthLabels[number];
export type ItemPerMonthCounter = Record<MonthLabel, number>;
