import { shape, string } from "prop-types";
import { idType } from "./idType";
import { profileType } from "./userProfileType";

// Note: PUBLIC-facing user fields only
export const publicUserType = shape({
  email: string.isRequired,
  phone: string.isRequired,
  profile: profileType.isRequired
});

// Note: privateUserType for own-user data only
export const privateUserType = shape({
  id: idType.isRequired,
  email: string.isRequired,
  phone: string.isRequired,
  profile: profileType.isRequired
});
