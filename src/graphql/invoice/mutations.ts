import { gql } from "@apollo/client";
import { InvoiceWithWorkOrderFields } from "../invoice/fragments";

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($invoice: InvoiceInput!) {
    createInvoice(invoice: $invoice) {
      ...InvoiceWithWorkOrderFields
    }
  }
  ${InvoiceWithWorkOrderFields}
`;

export const UPDATE_INVOICE_AMOUNT = gql`
  mutation UpdateInvoiceAmount($invoiceID: ID!, $amount: Int!) {
    updateInvoiceAmount(invoiceID: $invoiceID, amount: $amount) {
      ...InvoiceWithWorkOrderFields
    }
  }
  ${InvoiceWithWorkOrderFields}
`;

export const PAY_INVOICE = gql`
  mutation PayInvoice($invoiceID: ID!) {
    payInvoice(invoiceID: $invoiceID) {
      ...InvoiceWithWorkOrderFields
    }
  }
  ${InvoiceWithWorkOrderFields}
`;

export const DELETE_INVOICE = gql`
  mutation DeleteInvoice($invoiceID: ID!) {
    deleteInvoice(invoiceID: $invoiceID) {
      id
      wasDeleted
    }
  }
`;
