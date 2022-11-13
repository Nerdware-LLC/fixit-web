import type { TypePolicies } from "@apollo/client/cache";

export const invoiceTypePolicy: TypePolicies = {
  Invoice: {
    fields: {
      amount: {
        read: (existing?: string) => {
          const amountStr = `${existing}`;
          // prettier-ignore
          return existing
            ? `${amountStr.substring(0, amountStr.length - 2)}.${amountStr.slice(-2)}`
            : null;
        }
      }
    }
  }
};
