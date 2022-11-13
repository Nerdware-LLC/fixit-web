import { shape, string } from "prop-types";

export const profileType = shape({
  displayName: string,
  givenName: string,
  familyName: string,
  businessName: string,
  photoUrl: string
});

export const profileInputType = shape({
  givenName: string,
  familyName: string,
  businessName: string,
  photoUrl: string
});
