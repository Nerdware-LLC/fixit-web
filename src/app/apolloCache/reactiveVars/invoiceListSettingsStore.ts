import { ListSettingsStore } from "./ListSettingsStore";
// import { tokenFieldsStore } from "./tokenFieldsStore";
import { sortBy } from "../../../utils";

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
    CONTACT: (array) => {
      // FIXME
      // if (!userContactsType) {
      //   userContactsType = tokenFieldsStore.get().userContactsType;
      // }
      // const nestedKey = `${userContactsType.toLowerCase()}.profile.displayName`;
      // return sortBy.getFnToSortObjectsByNestedKey(nestedKey)(array);

      return array;
    },
    // @ts-ignore
    STATUS: (array) => sortBy.invStatus(array)
  }
});
