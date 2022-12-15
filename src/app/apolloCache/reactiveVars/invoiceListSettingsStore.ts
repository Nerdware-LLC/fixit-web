import { ListSettingsStore } from "./ListSettingsStore";
import { sortBy } from "@utils";

export const invoiceListSettingsStore = new ListSettingsStore({
  enumFieldFilters: {
    status: ["OPEN", "CLOSED", "DISPUTED"]
  },
  getSearchFilterFn: (inputRegex) => {
    return (inv) =>
      inputRegex.test(inv?.createdBy?.profile?.displayName) ||
      inputRegex.test(inv?.assignedTo?.profile?.displayName) ||
      inputRegex.test(inv?.workOrder.address);
  },
  // FIXME types for ListSettingsStore sortFactors is not right.
  sortFactors: {
    // @ts-ignore
    DATE: (array) => sortBy.createdAt(array),
    // @ts-ignore
    ADDRESS: (array) => sortBy.address(array),
    // @ts-ignore
    CREATED_BY: (array) => {
      return sortBy.getFnToSortObjectsByNestedKey("createdBy.profile.displayName")(array);
    },
    // @ts-ignore
    ASSIGNED_TO: (array) => {
      return sortBy.getFnToSortObjectsByNestedKey("assignedTo.profile.displayName")(array);
    },
    // @ts-ignore
    STATUS: (array) => sortBy.invStatus(array)
  }
});
