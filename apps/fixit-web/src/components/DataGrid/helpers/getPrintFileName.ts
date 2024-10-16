/**
 * This function provides a `fileName` string for the `DataGrid` prop
 * `slotProps.toolbar.csvOptions.fileName`.
 *
 * @example
 * ```tsx
 * <DataGrid
 *   // ... other props ...
 *   slotProps={{
 *     toolbar: {
 *       csvOptions: {
 *         fileName: getPrintFileName( // "Fixit_Invoices_2023-01-01"
 *           "Invoices",
 *           new Date("1/1/2023 12:00:00 AM"), // <-- optional
 *         )
 *       },
 *     },
 *   }}
 * />
 * ```
 */
export const getPrintFileName = (
  dataGridContentDescription: string,
  printDate: Date = new Date()
): string => {
  return [
    "Fixit", //                                        app name prefix
    dataGridContentDescription.replace(/\s/g, "_"), // content description without spaces
    printDate.toISOString().replace(/T.*$/, ""), //    ISO 8601 (YYYY-MM-DD)
  ].join("_");
};
