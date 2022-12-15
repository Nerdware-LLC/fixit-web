import type { TypePolicies } from "@apollo/client/cache";
import { prettifyStr } from "@utils";

export const profileTypePolicy: TypePolicies = {
  Profile: {
    fields: {
      givenName: {
        read: (existing?: string) => existing && prettifyStr.capFirstLetterOnly(existing)
      },
      familyName: {
        read: (existing?: string) => existing && prettifyStr.capFirstLetterOnly(existing)
      }
    }
  }
};
