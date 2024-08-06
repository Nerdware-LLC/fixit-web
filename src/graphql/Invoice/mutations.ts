import { gql } from "@/types/__codegen__/gql.js";

export const CREATE_INVOICE = gql(`
  mutation CreateInvoice($invoice: InvoiceInput!) {
    createInvoice(invoice: $invoice) {
      ...InvoiceWithWorkOrderFields
    }
  }
`);

export const UPDATE_INVOICE_AMOUNT = gql(`
  mutation UpdateInvoiceAmount($invoiceID: ID!, $amount: Int!) {
    updateInvoiceAmount(invoiceID: $invoiceID, amount: $amount) {
      ...InvoiceWithWorkOrderFields
    }
  }
`);

export const PAY_INVOICE = gql(`
  mutation PayInvoice($invoiceID: ID!) {
    payInvoice(invoiceID: $invoiceID) {
      ...InvoiceWithWorkOrderFields
    }
  }
`);

export const DELETE_INVOICE = gql(`
  mutation DeleteInvoice($invoiceID: ID!) {
    deleteInvoice(invoiceID: $invoiceID) {
      id
      success
    }
  }
`);
