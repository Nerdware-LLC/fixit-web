import { shape, string } from "prop-types";
import { idType } from "./idType";
import { dateTypeRequired } from "./dateType";
import { profileType } from "./userProfileType";

export const contactType = shape({
  id: idType.isRequired,
  email: string.isRequired,
  phone: string.isRequired,
  profile: profileType.isRequired,
  createdAt: dateTypeRequired,
  updatedAt: dateTypeRequired
});
