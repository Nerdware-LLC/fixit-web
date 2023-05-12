import type {
  ItemDataParser,
  DataParserItem,
  DataParserAccum,
  DataParserAccumUpdater,
} from "./ItemDataParser";

export interface ItemsPerStatusDataParserItem extends DataParserItem {
  status: string;
}

export interface ItemsPerStatusDataParserAccum<TItem extends ItemsPerStatusDataParserItem>
  extends DataParserAccum {
  STATUS_COUNTS: Record<TItem["status"], number>;
}

/**
 * This `ItemDataParser` implementation is used to count the number of items
 * per item-status.
 */
export class ItemsPerStatusDataParser<TItem extends ItemsPerStatusDataParserItem>
  implements ItemDataParser<TItem, ItemsPerStatusDataParserAccum<TItem>>
{
  initialDataAccum: ItemsPerStatusDataParserAccum<TItem>;
  dataAccumUpdater: DataParserAccumUpdater<TItem>;

  constructor(itemStatuses: ReadonlyArray<TItem["status"]>) {
    this.initialDataAccum = {
      STATUS_COUNTS: itemStatuses.reduce(
        (acc, status) => ({ ...acc, [status]: 0 }),
        {} as ItemsPerStatusDataParserAccum<TItem>["STATUS_COUNTS"]
      ),
    };

    this.dataAccumUpdater = (dataReducerAccum, { status }: { status: TItem["status"] }) => {
      dataReducerAccum.STATUS_COUNTS[status] += 1;
      return dataReducerAccum;
    };
  }
}
