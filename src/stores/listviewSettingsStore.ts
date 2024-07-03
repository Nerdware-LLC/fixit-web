import { testShouldUseMobileLayout } from "@/app/PageLayoutContext/helpers.js";
import { LIST_VIEW_MODES, type ListViewSettings } from "@/layouts/CoreItemsListView/types.js";
import { ReactiveStore, LocalStorageValueManager } from "./helpers";

// Ascertain a sensible default for stored ListViewSettings:
const isMobilePageLayout = testShouldUseMobileLayout();
const defaultListViewSettings = {
  viewMode: isMobilePageLayout ? LIST_VIEW_MODES.LIST : LIST_VIEW_MODES.TABLE,
  listVisibility: { Inbox: true, Sent: !isMobilePageLayout },
};

/**
 * A `LocalStorageValueManager` instance for the `"workOrdersListViewSettings"` key.
 */
export const workOrdersListViewSettingsLocalStorage = new LocalStorageValueManager<
  ListViewSettings<true>
>("workOrdersListViewSettings", { initialValue: defaultListViewSettings });

/**
 * A `LocalStorageValueManager` instance for the `"invoicesListViewSettings"` key.
 */
export const invoicesListViewSettingsLocalStorage = new LocalStorageValueManager<
  ListViewSettings<true>
>("invoicesListViewSettings", { initialValue: defaultListViewSettings });

/**
 * A `LocalStorageValueManager` instance for the `"contactsListViewSettings"` key.
 */
export const contactsListViewSettingsLocalStorage = new LocalStorageValueManager<
  ListViewSettings<false>
>("contactsListViewSettings", {
  initialValue: {
    ...defaultListViewSettings,
    listVisibility: null, // <-- overridden, because ContactsListView doesn't have Inbox/Sent lists
  },
});

/**
 * This object contains all `ListViewSettingsStore`s, keyed by the name of the
 * core-item type they are associated with.
 */
export const listViewSettingsStore = {
  workOrders: new ReactiveStore<ListViewSettings<true>>({
    storageValueManager: workOrdersListViewSettingsLocalStorage,
  }),
  invoices: new ReactiveStore<ListViewSettings<true>>({
    storageValueManager: invoicesListViewSettingsLocalStorage,
  }),
  contacts: new ReactiveStore<ListViewSettings<false>>({
    storageValueManager: contactsListViewSettingsLocalStorage,
  }),
} as const;

export type ListViewSettingsStoreKey = keyof typeof listViewSettingsStore;
