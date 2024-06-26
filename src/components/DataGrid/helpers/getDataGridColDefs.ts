import { isPlainObject } from "@nerdware/ts-type-safety-utils";
import { commonColDefs } from "./commonColDefs.js";
import type { GridValidRowModel, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import type { Simplify, OverrideProperties } from "type-fest";

/**
 * This function provides a map of complete [`GridColDef`][col-defs-docs] objects for a
 * [Mui `DataGrid`][mui-overview] component. To obtain the array needed for the `DataGrid`s
 * `"column"` prop, use `Object.values()` on the returned object.
 *
 * The following defaults are applied to all [`GridColDef`][col-defs-docs] objects:
 *
 * - `field: "<key>"` _(where `<key>` is a key of the `partialGridColDefs` argument)_
 * - `type: "string"`
 * - `editable: false`
 * - `minWidth:`
 *   - `100` for `type: "date"`
 *   - `160` for `type: "dateTime"`
 *   - `150` for all other types
 * - `maxWidth: 600`
 *
 * [mui-overview]: https://mui.com/x/react-data-grid/
 * [col-defs-docs]: https://mui.com/x/react-data-grid/column-definition/
 *
 * @param partialGridColDefs - A map of column `field` names to partial [`GridColDef`][col-defs-docs] objects.
 * @returns A map of complete [`GridColDef`][col-defs-docs] objects for `DataGrid`.
 *
 * @note The `GridColDef` type params explained:
 * - The first param reflects the type of items provided to the grid as data (e.g., Contact).
 * - The second param must reflect the type of data rendered in a given column (e.g., string).
 * - The third param reflects return type of the valueFormatter function (default = 2nd param).
 */
export const getDataGridColDefs = <
  TRowData extends GridValidRowModel,
  TCustomColConfigs extends CustomColumnConfigs<TRowData> | undefined = undefined,
  TColDataTypes extends ColumnDataTypes<TRowData, TCustomColConfigs> = ColumnDataTypes<
    TRowData,
    TCustomColConfigs
  >,
>(
  partialGridColDefs: MapRowDataTypesToColDefParams<TRowData, TColDataTypes>
) => {
  return Object.fromEntries(
    Object.entries(partialGridColDefs).map(([columnFieldKey, gridColDef]) => {
      // Ensure type safety for `gridColDef`:
      if (!isPlainObject(gridColDef)) throw new Error("Invalid `gridColDef` object.");
      return [
        columnFieldKey,
        {
          // Each column entry is mapped to an object with "field"
          field: columnFieldKey,
          // GridColDef global defaults:
          ...commonColDefs.defaults,
          // GridColDef type-based defaults:
          ...(gridColDef.type === "date"
            ? commonColDefs.dateDefaults
            : gridColDef.type === "dateTime"
              ? commonColDefs.dateTimeDefaults
              : {}),
          // If `renderCell` is present, `valueFormatter` is necessary for print/export:
          ...(!!gridColDef?.renderCell && commonColDefs.renderCellBaseValueFormatter),
          ...gridColDef, // <-- explicit configs override above defaults
        },
      ];
    })
  ) as MapRowDataTypesToColDefs<TRowData, TColDataTypes>;
};

/**
 * An object for configuring custom columns, by adding and/or omitting fields from
 * the `TRowData` type param provided to the `getDataGridColDefs` function.
 */
interface CustomColumnConfigs<TRowData extends GridValidRowModel> {
  add?: GridValidRowModel;
  omit?: keyof TRowData;
}

/**
 * This util type implements any column customizations provided in the `TCustomColConfigs`
 * type param. The `TRowData` type param is modified as follows:
 * - Fields specified in `"omit"` are omitted (`Omit<TRowData, TColConfigs["omit"]>`)
 * - Fields specified in `"add"` are intersected (`TRowData & TColConfigs["add"]`)
 */
type ColumnDataTypes<
  TRowData extends GridValidRowModel,
  TColConfigs extends CustomColumnConfigs<TRowData> | undefined,
> =
  TColConfigs extends CustomColumnConfigs<TRowData>
    ? Simplify<
        (TColConfigs["omit"] extends string ? Omit<TRowData, TColConfigs["omit"]> : TRowData) &
          (TColConfigs["add"] extends GridValidRowModel ? TColConfigs["add"] : NonNullable<unknown>)
      >
    : TRowData;

/**
 * This type defines {@link getDataGridColDefs}'s `partialGridColDefs` parameter.
 * It maps `TRowData` to `GridColDef` objects with the following modifications:
 *
 * - `GridColDef` is wrapped in `Partial<>` to allow the caller to dedupe their configs by
 *   omitting defaults set by `getDataGridColDefs`.
 *
 * - `valueGetter` is overridden to return `string | null | undefined` rather than the `V`
 *   value-type parameter of the `GridColDef` generic. Reasons:
 *   - `valueGetter` is often used to retrieve a value from a nested object (e.g., `(obj) =>
 *     obj.id`), so it doesn't really make sense to have it return the `V` value type param.
 *   - The value returned from `valueGetter` is also used for filtering and sorting, so it's
 *     desirable to encourage returning `string | null | undefined` to avoid the need for
 *     custom `sortComparator` and/or `valueFormatter` functions.
 */
type MapRowDataTypesToColDefParams<
  TRowData extends GridValidRowModel,
  TColData extends GridValidRowModel,
> = Readonly<{
  [Key in keyof TColData]-?: Exclude<
    Partial<
      OverrideProperties<
        GridColDef<TRowData, TColData[Key], GridColDefFormattedValueType<TColData[Key]>>,
        {
          valueGetter?: (
            params: GridValueGetterParams<TRowData, TColData[Key]>
          ) => string | null | undefined;
        }
      >
    >,
    undefined
  >;
}>;

/**
 * This type defines {@link getDataGridColDefs}'s return type.
 * It maps `TRowData` to complete `GridColDef` objects.
 */
type MapRowDataTypesToColDefs<
  TRowData extends GridValidRowModel,
  TColData extends GridValidRowModel,
> = Readonly<{
  [Key in keyof TColData]-?: GridColDef<
    TRowData,
    TColData[Key],
    GridColDefFormattedValueType<TColData[Key]>
  >;
}>;

/**
 * This type is used to ascertain the formatted-value type of a `GridColDef`. Dates and
 * numbers are converted to strings, `null` and `undefined` are preserved if present.
 */
type GridColDefFormattedValueType<T> = T extends Date | number | null | undefined
  ? T extends Date | number
    ? string
    : string | null | undefined
  : T;
