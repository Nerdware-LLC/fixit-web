import { gql } from "@apollo/client";
import { InvoiceFields, InvoiceWithWorkOrderFields } from "../invoice/fragments";

export const INVOICE = gql`
  query Invoice($invoiceID: ID!) {
    invoice(invoiceID: $invoiceID) {
      ...InvoiceWithWorkOrderFields
    }
  }
  ${InvoiceWithWorkOrderFields}
`;

export const MY_INVOICES = gql`
  query Invoices {
    myInvoices {
      createdByUser {
        ...InvoiceFields
      }
      assignedToUser {
        ...InvoiceFields
      }
    }
  }
  ${InvoiceFields}
`;
