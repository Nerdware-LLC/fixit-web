import type { UnionToIntersection, Simplify } from "type-fest";
import type { ItemDataParser, DataParserItem, DataParserAccum } from "./ItemDataParsers";

/**
 * The purpose of this class is to provide functions which can be used to reduce
 * arrays of items like WorkOrders and Invoices in a manner that ensures all
 * dashboard-widget data is collected with just ONE loop-iteration per render.
 *
 * To gather this data, items-arrays are reduced with a specified "data accumulator"
 * object that contains nested objects with relevant K-V pairs for each set of data
 * to be collected. For example, a data-accumulator with a single data set which
 * simply counts the number of OPEN/CLOSED Invoices may take the following shape:
 * `{ INV_STATUS_COUNTS: { OPEN: 0, CLOSED: 0 } }`.
 *
 * To update these data points, each data set also must have a corresponding function
 * with an `Array.reduce()` signature which parses array items and updates its data
 * points in the data accumulator.
 */
export class ItemsDataReducer<
  TItem extends DataParserItem,
  TDataParsers extends Array<ItemDataParser<TItem, DataParserAccum>>
> {
  // INSTANCE MEMBERS
  readonly initialDataAccum: CombinedReducerAccum<TItem, TDataParsers>;
  readonly reduceItems: (arrayOfItems: Array<TItem>) => CombinedReducerAccum<TItem, TDataParsers>;

  constructor(arrayOfItemDataParsers: TDataParsers) {
    // Combine all `initialDataAccum`s and `dataAccumUpdater`s
    const { combinedInitialDataAccum, arrayOfDataAccumUpdaterFns } = arrayOfItemDataParsers.reduce<{
      combinedInitialDataAccum: CombinedReducerAccum<TItem, TDataParsers>;
      arrayOfDataAccumUpdaterFns: Array<TDataParsers[number]["dataAccumUpdater"]>;
    }>(
      (accum, itemDataParser) => ({
        // Update combinedInitialDataAccum
        combinedInitialDataAccum: {
          ...accum.combinedInitialDataAccum,
          ...itemDataParser.initialDataAccum,
        },
        // Update arrayOfDataAccumUpdaterFns
        arrayOfDataAccumUpdaterFns: [
          ...accum.arrayOfDataAccumUpdaterFns,
          itemDataParser.dataAccumUpdater,
        ],
      }),
      {
        combinedInitialDataAccum: {} as CombinedReducerAccum<TItem, TDataParsers>,
        arrayOfDataAccumUpdaterFns: [],
      }
    );

    this.initialDataAccum = { ...combinedInitialDataAccum };
    this.reduceItems = (arrayOfItems) => {
      return arrayOfItems.reduce((itemsDataAccum, item, index, itemsArray) => {
        // For each item, each accum-updater function is called
        arrayOfDataAccumUpdaterFns.forEach((dataAccumUpdater) => {
          itemsDataAccum = dataAccumUpdater(itemsDataAccum, item, index, itemsArray);
        });
        return itemsDataAccum;
      }, structuredClone(this.initialDataAccum));
    };
  }
}

type CombinedReducerAccum<
  TItem extends DataParserItem,
  TDataParsers extends Array<ItemDataParser<TItem, DataParserAccum>>
> = Simplify<UnionToIntersection<TDataParsers[number]["initialDataAccum"]>>;
