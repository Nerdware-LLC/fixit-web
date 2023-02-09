import { ItemDataParser } from "./ItemDataParser";
import type { WorkOrder, Invoice } from "@types";

export class ItemStatusCountDataParser<
  TItem extends WorkOrder | Invoice
> extends ItemDataParser<TItem> {
  constructor(itemStatuses: ReadonlyArray<TItem["status"]>) {
    super({
      initialDataAccum: {
        STATUS_COUNTS: Object.fromEntries(
          itemStatuses.map((status) => [status, 0])
        ) as ItemStatusCounter<TItem>
      },
      dataAccumUpdater: (dataReducerAccum, item) => {
        // TS not inferring the status relationship here, hence the `as ...` type cast
        dataReducerAccum.STATUS_COUNTS[item.status] += 1;
        return dataReducerAccum;
      }
    });
  }
}

export type ItemStatusCounter<T extends WorkOrder | Invoice> = Record<T["status"], number>;
