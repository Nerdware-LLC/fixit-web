import type { TypePolicies } from "@apollo/client/cache";
import { prettifyStr } from "@utils";

export const userTypePolicy: TypePolicies = {
  User: {
    fields: {
      phone: {
        read: (existing: string) => prettifyStr.phone(existing)
      }
    }
  }
};
