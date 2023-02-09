import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql";
import { Loading, Error } from "@components";
import { CoreContentViewLayout } from "@layouts";
import { InvoiceItemViewHeader } from "./ItemViewHeader";
import { InvoiceItemViewContent } from "./ItemViewContent";
import { MOCK_INVOICES } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const InvoiceItemView = () => {
  const { id } = useParams();
  // Get isItemOwnedByUser state-param provided by CoreItemsList component
  const {
    state: { isItemOwnedByUser }
  } = useLocation();

  const { loading, error, networkStatus } = useQuery(QUERIES.INVOICE, {
    // TODO fetchPolicy: cache only?
    variables: { invoiceID: id },
    notifyOnNetworkStatusChange: true,
    skip: true // TODO turn this off later
  });

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  const MOCK_invoice = [
    ...MOCK_INVOICES.myInvoices.createdByUser,
    ...MOCK_INVOICES.myInvoices.assignedToUser
  ].find((inv) => inv.id === id);

  if (!MOCK_invoice) return null;

  return (
    <CoreContentViewLayout
      headerLabel="Invoice"
      headerComponents={
        <InvoiceItemViewHeader invoice={MOCK_invoice} isItemOwnedByUser={isItemOwnedByUser} />
      }
    >
      <InvoiceItemViewContent invoice={MOCK_invoice} isItemOwnedByUser={isItemOwnedByUser} />
    </CoreContentViewLayout>
  );
};
