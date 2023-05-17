import { testIsMobileUserAgent } from "@app/PageLayoutContext/testIsMobileUserAgent";
import { ListViewListName } from "@layouts/CoreItemsListView/types";
import { storage } from "@utils/storage";
import { ReactiveStore } from "./ReactiveStore";
import type { Simplify } from "type-fest";

export type ListOrTable = "LIST" | "TABLE";
export type ListOrTableSetting = { listOrTable: ListOrTable };

export type ListVisibility = Record<ListViewListName, boolean>;
export type ListVisibilitySetting = { listVisibility: ListVisibility };

export type ListViewSettings = Simplify<ListOrTableSetting & ListVisibilitySetting>;
export type ListViewAllSettings = Required<ListViewSettings>;

/**
 * A reactive store for implementations of `CoreItemsListView` which stores
 * the user's preferred view (list or table) in localStorage.
 */
class ListViewSettingsStore extends ReactiveStore<ListViewSettings> {
  constructor({
    storageKey,
  }: {
    storageKey:
      | "workOrdersListViewSettings"
      | "invoicesListViewSettings"
      | "contactsListViewSettings";
  }) {
    super({ storageKey });
  }
}

const _isMobilePageLayout = testIsMobileUserAgent() || window.innerWidth < window.innerHeight;

// For added safety, initialize stored values before exporting the stores.
storage.workOrdersListViewSettings.setDefaultIfEmpty({
  listOrTable: _isMobilePageLayout ? "LIST" : "TABLE",
  listVisibility: { Inbox: true, Sent: !_isMobilePageLayout },
});
storage.invoicesListViewSettings.setDefaultIfEmpty({
  listOrTable: _isMobilePageLayout ? "LIST" : "TABLE",
  listVisibility: { Inbox: true, Sent: !_isMobilePageLayout },
});
storage.contactsListViewSettings.setDefaultIfEmpty({
  listOrTable: _isMobilePageLayout ? "LIST" : "TABLE",
});

/**
 * This object contains all `ListViewSettingsStore`s, keyed by the name of the
 * core-item type they are associated with.
 */
export const listViewSettingsStore = {
  workOrders: new ListViewSettingsStore({ storageKey: "workOrdersListViewSettings" }),
  invoices: new ListViewSettingsStore({ storageKey: "invoicesListViewSettings" }),
  contacts: new ListViewSettingsStore({ storageKey: "contactsListViewSettings" }),
};

export type ListViewSettingsStoreKey = keyof typeof listViewSettingsStore;
