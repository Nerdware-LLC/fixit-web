import { ListSettingsStore } from "./ListSettingsStore";
// import { tokenFieldsStore } from "./tokenFieldsStore";
import { sortBy } from "../../../utils";

export const woListSettingsStore = new ListSettingsStore({
  enumFieldFilters: {
    status: ["UNASSIGNED", "ASSIGNED", "IN_PROGRESS", "DEFERRED", "COMPLETE"]
  },
  getSearchFilterFn: (inputRegex) => {
    return (wo) =>
      inputRegex.test(wo?.createdBy?.profile?.displayName) ||
      inputRegex.test(wo?.assignedTo?.profile?.displayName) ||
      inputRegex.test(wo.address);
  },
  // FIXME fix sortFactors types
  sortFactors: {
    // @ts-ignore
    DATE: (array) => sortBy.createdAt(array),
    // @ts-ignore
    STATUS: (array) => sortBy.woStatus(array),
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
    CATEGORY: (array) => sortBy.woCategory(array),
    // @ts-ignore
    PRIORITY: (array) => sortBy.woPriority(array)
  }
});
