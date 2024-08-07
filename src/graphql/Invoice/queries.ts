import { gql } from "@/types/__codegen__/gql.js";

export const INVOICE = gql(`
  query Invoice($invoiceID: ID!) {
    invoice(invoiceID: $invoiceID) {
      ...InvoiceWithWorkOrderFields
    }
  }
`);

export const MY_INVOICES = gql(`
  query MyInvoices {
    myInvoices {
      createdByUser {
        ...InvoiceFields
      }
      assignedToUser {
        ...InvoiceFields
      }
    }
  }
`);

export const MY_INVOICES_WITH_WORKORDER_DATA = gql(`
  query MyInvoicesWithWorkOrderData {
    myInvoices {
      createdByUser {
        ...InvoiceWithWorkOrderFields
      }
      assignedToUser {
        ...InvoiceWithWorkOrderFields
      }
    }
  }
`);
