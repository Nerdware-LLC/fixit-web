/**
 * An `ItemDataParser` takes in an individual ITEM provided by
 * `ItemsDataReducer` and updates the `DataReducerAccum` accordingly.
 */
export interface ItemDataParser<TItem extends DataParserItem, TAccum extends DataParserAccum> {
  initialDataAccum: TAccum;
  dataAccumUpdater: DataParserAccumUpdater<TItem>;
}

export interface DataParserItem {
  [K: PropertyKey]: any;
}

export interface DataParserAccum<DataParserAccumValue = any> {
  [K: string]: DataParserAccumValue;
}

/**
 * A `DataParserAccumUpdater` is a generic type which wraps `Array.prototype.reduce`,
 * a function which is itself generic.
 *
 * The generic _type_ parameter, `TItem`, specifies the type of the array items used
 * in the 2nd and 4th parameters of `Array.prototype.reduce`.
 */
export type DataParserAccumUpdater<TItem extends DataParserItem> = <TAccum extends DataParserAccum>(
  accum: TAccum,
  item: TItem,
  index: number,
  array: Array<TItem>
) => TAccum;
