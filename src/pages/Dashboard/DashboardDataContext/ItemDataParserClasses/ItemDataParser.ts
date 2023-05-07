import type { WorkOrder, Invoice } from "@graphql/types";

/**
 * // TODO Add jsdoc to ItemDataParser in @pages/Dashboard/DashboardDataContext/itemDataParsers.ts
 */
export class ItemDataParser<TItem extends WorkOrder | Invoice> {
  initialDataAccum: ItemDataAccum;
  dataAccumUpdater: <TDataAccum extends ItemDataAccum>(
    accum: TDataAccum,
    item: TItem
  ) => TDataAccum;

  constructor({
    initialDataAccum,
    dataAccumUpdater,
  }: {
    initialDataAccum: ItemDataAccum;
    dataAccumUpdater: <TDataAccum extends ItemDataAccum>(
      accum: TDataAccum,
      item: TItem
    ) => TDataAccum;
  }) {
    this.initialDataAccum = initialDataAccum;
    this.dataAccumUpdater = dataAccumUpdater;
  }
}

export type ItemDataAccum = Record<string, Record<string, any>>;
