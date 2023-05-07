import type { InvoiceStatus } from "@graphql/types";

export const INVOICE_STATUSES: ReadonlyArray<InvoiceStatus> = [
  "OPEN",
  "CLOSED",
  "DISPUTED",
] as const;
