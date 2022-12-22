import type { User } from "./User.types";

export type Contact = {
  id: string;
  handle: User["handle"];
  email: User["email"];
  phone: User["phone"];
  profile: User["profile"];
  // These two are not currently available via the GQL API:
  // createdAt: Date;
  // updatedAt: Date;
};
