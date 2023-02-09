import type { WorkOrder, Invoice } from "@types";

export class ItemDataParser<TItem extends WorkOrder | Invoice> {
  initialDataAccum: ItemDataAccum;
  dataAccumUpdater: <TDataAccum extends ItemDataAccum>(
    accum: TDataAccum,
    item: TItem
  ) => TDataAccum;

  constructor({
    initialDataAccum,
    dataAccumUpdater
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
