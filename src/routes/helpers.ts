import { APP_PATH_COMPONENTS } from "./appPaths.js";

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

/**
 * This is a helper function to determine if a given `urlStr` is an external URL.
 * @param urlStr The URL to check.
 * @returns `true` if the `urlStr` is an external URL, `false` otherwise.
 */
export const isExternalUrl = (urlStr?: string) => {
  return urlStr && urlStr.startsWith("http") && !urlStr.includes("gofixit.app");
};
