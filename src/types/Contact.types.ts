import type { User } from "./User.types";

export type Contact = {
  id: string;
  email: User["email"];
  phone: User["phone"];
  profile: User["profile"];
  createdAt: Date;
  updatedAt: Date;
};
