import type { User } from "./User.type";

export const CONTACT_CONSTANTS = {
  // FIXME Update Contact "status" enum values, these are outdated.
  STATUSES: ["Active", "ConnectionRequestReceived", "ConnectionRequestSent"]
};

export type Contact = {
  id: string; // FIXME ATM this is the Contact's UserID
  email: User["email"];
  phone: User["phone"];
  profile: User["profile"];
  createdAt: Date;
  updatedAt: Date;
  // FIXME API Contact type does NOT currently have "status" - can that be rm'd from Contact prop-types?
};
