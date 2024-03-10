import type { InvoiceStatus } from "@/graphql/types";

export const INVOICE_STATUSES = [
  "OPEN",
  "CLOSED",
  "DISPUTED",
] as const satisfies ReadonlyArray<InvoiceStatus>;
