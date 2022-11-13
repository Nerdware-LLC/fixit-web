import { shape, oneOf, string } from "prop-types";
import { idType } from "./idType";
import { profileType } from "./userProfileType";
import { CONTACT_CONSTANTS } from "../Contact.type";

export const contactType = shape({
  id: idType.isRequired,
  email: string.isRequired,
  phone: string.isRequired,
  profile: profileType.isRequired,
  status: oneOf(CONTACT_CONSTANTS.STATUSES).isRequired
});
