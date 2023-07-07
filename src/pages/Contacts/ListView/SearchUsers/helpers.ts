import { string as yupString } from "yup";
import type { SearchUsersInputType, SearchUsersInputActionType } from "./types";

const getInputType = (value?: string | null): SearchUsersInputType => {
  return !value
    ? null
    : value[0] === "@"
    ? "handle"
    : /^\d{1,10}$/.test(value) // Do not use for validation (see helpers.getInputType jsdoc)
    ? "phone"
    : "email";
};

/**
 * SearchUsers helper methods
 */
export const helpers = Object.freeze({
  /**
   * This method looks at the first few characters of the provided input
   * to try to determine what type of input it is.
   *
   * > Note: **_this method is NOT for validation_**, it just helps components
   *   determine what to render. For example, if the input begins with "@",
   *   then the TextField InputAdornment includes a search icon, otherwise it
   *   includes a send-invite icon.
   */
  getInputType,

  /**
   * - `"search"` - SearchForUsersByHandle
   * - `"invite"` - CreateUserInvite
   */
  getInputActionType(
    value?: string | null,
    inputType: SearchUsersInputType = getInputType(value)
  ): SearchUsersInputActionType {
    return !inputType ? null : inputType === "handle" ? "search" : "invite";
  },

  /**
   * SearchUsers - HANDLE VALIDATOR
   *
   * The SearchUsers query arg must start with an "@" symbol, followed
   * by at least one alphanumeric character or underscore. Handles can
   * have at most 50 characters after the "@" symbol.
   */
  isValidHandleForSearchUsersQuery(value?: string | null): boolean {
    return !!value && /^@[a-z0-9_]{1,50}/i.test(value);
  },

  /**
   * CreateInvite - PHONE VALIDATOR
   */
  isValidPhoneForCreateInvite(value?: string | null): boolean {
    return !!value && /^[1-9]\d{9}$/.test(value);
  },

  /**
   * CreateInvite - EMAIL VALIDATOR
   */
  isValidEmailForCreateInvite(value?: string | null): boolean {
    return !!value && yupString().email().isValidSync(value);
  },

  /**
   * Calls `getInputType` to ascertain the type of value in `searchField`, then
   * calls the relevant validator function. If the value is empty, returns `false`.
   */
  isValidSearchFieldValue(
    value?: string | null,
    inputType: SearchUsersInputType = getInputType(value)
  ): boolean {
    return !inputType
      ? false
      : inputType === "handle"
      ? this.isValidHandleForSearchUsersQuery(value)
      : inputType === "phone"
      ? this.isValidPhoneForCreateInvite(value)
      : this.isValidEmailForCreateInvite(value);
  },

  /**
   * This method determines whether the input value is valid for the `CreateInvite`
   * mutation.
   */
  isValidInputForCreateInvite(
    value?: string | null,
    inputType: SearchUsersInputType = getInputType(value)
  ): boolean {
    return !inputType || inputType === "handle"
      ? false
      : inputType === "phone"
      ? this.isValidPhoneForCreateInvite(value)
      : this.isValidEmailForCreateInvite(value);
  },

  /**
   * CreateContact - HANDLE VALIDATOR
   *
   * The CreateContact mutation arg must be a valid User handle.
   */
  isValidHandleForCreateContact(value?: string | null): boolean {
    return !!value && /^@[a-z0-9_]{3,50}$/i.test(value);
  },

  /**
   * Similar to `isValidSearchFieldValue()`, but "handle" values are
   * checked against `isValidHandleForCreateContact()`.
   */
  isValidFinalValue(
    value?: string | null,
    inputType: SearchUsersInputType = getInputType(value)
  ): boolean {
    return !inputType
      ? false
      : inputType === "handle"
      ? this.isValidHandleForCreateContact(value)
      : inputType === "phone"
      ? this.isValidPhoneForCreateInvite(value)
      : this.isValidEmailForCreateInvite(value);
  },
});
