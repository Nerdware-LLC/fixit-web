import type {
  ItemDataParser,
  DataParserItem,
  DataParserAccum,
  DataParserAccumUpdater,
} from "./ItemDataParser";

export interface ItemsStatisticsDataParserAccum extends DataParserAccum {
  STATISTICS: {
    SUM: number;
    AVERAGE: number;
  };
}

export type GetItemStatFn<TItem> = (item: TItem) => number | undefined;

/**
 * This `ItemDataParser` implementation is used to gather basic statistics like
 * `"SUM"` and `"AVERAGE"` about the items in a data set.
 *
 * All `ItemsStatisticsDataParser` instances share the same `initialDataAccum`,
 * so this implementation makes it a static member.
 */
export class ItemsStatisticsDataParser<TItem extends DataParserItem>
  implements ItemDataParser<TItem, ItemsStatisticsDataParserAccum>
{
  static initialDataAccum: ItemsStatisticsDataParserAccum = {
    STATISTICS: {
      SUM: 0,
      AVERAGE: 0,
    },
  };

  // Instance initialDataAccum is a reference to the static initialDataAccum
  initialDataAccum = ItemsStatisticsDataParser.initialDataAccum;
  dataAccumUpdater: DataParserAccumUpdater<TItem>;

  constructor(getItemStat: GetItemStatFn<TItem>) {
    this.initialDataAccum = { ...ItemsStatisticsDataParser.initialDataAccum };

    this.dataAccumUpdater = (dataReducerAccum, item, index) => {
      const amount = getItemStat(item);
      if (amount) {
        dataReducerAccum.STATISTICS.SUM += amount;
        dataReducerAccum.STATISTICS.AVERAGE = dataReducerAccum.STATISTICS.SUM / index + 1;
      }
      return dataReducerAccum;
    };
  }
}
