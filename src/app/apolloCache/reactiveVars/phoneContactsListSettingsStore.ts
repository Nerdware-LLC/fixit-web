import { ListSettingsStore } from "./ListSettingsStore";

export const phoneContactsListSettingsStore = new ListSettingsStore({
  getSearchFilterFn: inputRegex => {
    return phoneContact =>
      inputRegex.test(phoneContact.name) ||
      inputRegex.test(phoneContact.givenName) ||
      inputRegex.test(phoneContact.familyName) ||
      inputRegex.test(phoneContact.businessName) ||
      inputRegex.test(phoneContact.phone) ||
      inputRegex.test(phoneContact.email);
  }
});
