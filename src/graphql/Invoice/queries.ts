import { gql } from "@graphql/__codegen__";

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
