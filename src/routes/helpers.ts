import { APP_PATH_COMPONENTS } from "./appPaths";

const { HOME, WORK_ORDERS, INVOICES, CONTACTS } = APP_PATH_COMPONENTS;

/**
 * Get the URI-encoded path to the item view for the given `itemType` and `id`.
 * @param itemType The type of item to get the path for.
 * @param id The id of the item to get the path for.
 * @returns The path to the item view.
 */
export const getItemViewPath = (
  itemType: typeof WORK_ORDERS | typeof INVOICES | typeof CONTACTS,
  id: string
) => {
  return `/${HOME}/${itemType}/${encodeURIComponent(id)}`;
};
