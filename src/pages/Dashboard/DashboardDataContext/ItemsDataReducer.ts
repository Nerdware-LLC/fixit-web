import type { ItemDataParser } from "./ItemDataParserClasses";
import type { WorkOrder, Invoice } from "@types";

/**
 * The purpose of this function is to provide functions which can be used to reduce
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
 *
 * // TODO update this jsdoc to reflect usage with ItemDataParser, conversion from class-->fn
 */
export class ItemsDataReducer<TItem extends WorkOrder | Invoice> {
  initialDataAccum: Record<string, Record<string, any>>;
  reduceItems: (arrayOfItems: Array<TItem>) => Record<string, Record<string, any>>;

  constructor(arrayOfItemDataParsers: Array<InstanceType<typeof ItemDataParser<TItem>>>) {
    /* Combine all initialDataAccum objects into a single accum obj,
  and push all dataAccumUpdater functions into a single array.  */

    const { combinedInitialDataAccum, arrayOfDataAccumUpdaterFns } = arrayOfItemDataParsers.reduce<{
      combinedInitialDataAccum: Merge<typeof arrayOfItemDataParsers[number]["initialDataAccum"]>;
      arrayOfDataAccumUpdaterFns: Array<typeof arrayOfItemDataParsers[number]["dataAccumUpdater"]>;
    }>(
      (accum, itemDataParser) => {
        // Update combinedInitialDataAccum
        accum.combinedInitialDataAccum = {
          ...accum.combinedInitialDataAccum,
          ...itemDataParser.initialDataAccum
        };

        // Update arrayOfDataAccumUpdaterFns
        accum.arrayOfDataAccumUpdaterFns.push(itemDataParser.dataAccumUpdater);

        return accum;
      },
      { combinedInitialDataAccum: {}, arrayOfDataAccumUpdaterFns: [] }
    );

    this.initialDataAccum = { ...combinedInitialDataAccum };
    this.reduceItems = (
      arrayOfItems: Array<TItem>
    ): Merge<typeof arrayOfItemDataParsers[number]["initialDataAccum"]> => {
      // To ensure returned object isn't referencing an existing obj, make a new data accum
      const newDataAccum = Object.fromEntries(
        Object.entries(this.initialDataAccum).map(([dataParserKey, dataParserValuesObj]) => [
          dataParserKey,
          Object.fromEntries(
            Object.entries(dataParserValuesObj).map(([key, value]) => [
              key,
              typeof value === "number" ? 0 : Array.isArray(value) ? [] : {}
            ])
          )
        ])
      );
      // Call reduce with init accum set to `newDataAccum`
      return arrayOfItems.reduce((itemsDataAccum, item) => {
        // For each item, each accum-updater function is called
        arrayOfDataAccumUpdaterFns.forEach((dataAccumUpdater) => {
          itemsDataAccum = dataAccumUpdater(itemsDataAccum, item);
          /* The array of fns could be reduced as well since each fn returns the
          accum, but nested reducers made this harder to parse at a glance.   */
        });
        return itemsDataAccum;
      }, newDataAccum);
    };
  }
}

type AllKeys<T> = T extends any ? keyof T : never;

type PickType<Obj, Keys extends AllKeys<Obj>> = Obj extends Record<Keys, any>
  ? Obj[Keys]
  : undefined;

type PickTypeOf<Obj, Keys extends string | number | symbol> = Keys extends AllKeys<Obj>
  ? PickType<Obj, Keys>
  : never;

type Merge<T extends object> = {
  [K in AllKeys<T>]: PickTypeOf<T, K>;
};
