import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { authenticatedUserStore } from "@cache/authenticatedUserStore";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { coreContentViewLayoutClassNames } from "@layouts/CoreContentViewLayout/classNames";
import { CoreItemView } from "@layouts/CoreItemView";
import { InvoiceItemViewContent } from "./ItemViewContent";
import { InvoiceItemViewHeader } from "./ItemViewHeader";

export const InvoiceItemView = () => {
  const { id: invoiceID } = useParams();
  const { id: userID } = authenticatedUserStore.useSubToStore();

  const { data, loading, error } = useQuery(QUERIES.INVOICE, {
    variables: { invoiceID: invoiceID ?? "" },
    fetchPolicy: "cache-only",
    skip: !invoiceID || !userID,
  });

  return loading || !data?.invoice ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <CoreItemView
      headerLabel="Invoice"
      headerComponents={
        <InvoiceItemViewHeader
          invoice={data?.invoice}
          isItemOwnedByUser={data.invoice.createdBy.id === userID}
        />
      }
      sx={(theme) => ({
        [`& .${coreContentViewLayoutClassNames.childrenContainer}`]: {
          ...(!theme.variables.isMobilePageLayout && {
            padding: "2rem",
          }),
        },
      })}
    >
      <InvoiceItemViewContent invoice={data.invoice} />
    </CoreItemView>
  );
};
