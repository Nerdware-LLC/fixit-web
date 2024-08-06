import type { InvoiceStatus } from "@/types/graphql.js";

export const INVOICE_STATUSES = [
  "OPEN",
  "CLOSED",
  "DISPUTED",
] as const satisfies ReadonlyArray<InvoiceStatus>;
