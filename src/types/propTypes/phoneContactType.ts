import { shape, bool, string } from "prop-types";

export const phoneContactType = shape({
  isUser: bool.isRequired,
  id: string.isRequired,
  phone: string,
  name: string,
  email: string,
  givenName: string,
  familyName: string,
  businessName: string,
  photoUrl: string
});
