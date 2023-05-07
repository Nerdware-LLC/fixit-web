import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { coreContentViewLayoutClassNames } from "@layouts/CoreContentViewLayout/classNames";
import { CoreItemView } from "@layouts/CoreItemView";
import { InvoiceItemViewContent } from "./ItemViewContent";
import { InvoiceItemViewHeader } from "./ItemViewHeader";

export const InvoiceItemView = () => {
  const { id } = useParams();
  // Get isItemOwnedByUser state-param provided by CoreItemsList component
  const {
    state: { isItemOwnedByUser },
  } = useLocation();

  const { data, loading, error, networkStatus } = useQuery(QUERIES.INVOICE, {
    variables: { invoiceID: id ?? "" },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-only",
    skip: !id,
  });

  return loading || networkStatus === 4 || !data?.invoice ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <CoreItemView
      headerLabel="Invoice"
      headerComponents={
        <InvoiceItemViewHeader invoice={data?.invoice} isItemOwnedByUser={isItemOwnedByUser} />
      }
      sx={(theme) => ({
        [`& .${coreContentViewLayoutClassNames.childrenContainer}`]: {
          ...(!theme.variables.isMobilePageLayout && {
            padding: "2rem",
          }),
        },
      })}
    >
      <InvoiceItemViewContent invoice={data.invoice} isItemOwnedByUser={isItemOwnedByUser} />
    </CoreItemView>
  );
};
