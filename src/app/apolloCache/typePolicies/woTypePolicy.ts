import type { TypePolicies } from "@apollo/client/cache";
import { prettifyStr } from "../../../utils";

export const woTypePolicy: TypePolicies = {
  WorkOrder: {
    fields: {
      entryContactPhone: {
        read: (existing?: string) => existing && prettifyStr.phone(existing)
      }
    }
  }
};
