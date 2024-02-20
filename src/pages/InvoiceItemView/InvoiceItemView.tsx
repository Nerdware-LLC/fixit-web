import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Loading, ErrorDialog } from "@/components/Indicators";
import { QUERIES } from "@/graphql/queries";
import { coreContentViewLayoutClassNames } from "@/layouts/CoreContentViewLayout/classNames";
import { CoreItemView } from "@/layouts/CoreItemView";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore";
import { InvoiceItemViewContent } from "./InvoiceItemViewContent";
import { InvoiceItemViewHeader } from "./InvoiceItemViewHeader";
import type { SxPropsWithTheme } from "@/app/ThemeProvider/helpers";

export const InvoiceItemView = () => {
  const { id: invoiceID } = useParams();
  const authenticatedUser = authenticatedUserStore.useSubToStore();

  const { data, loading, error } = useQuery(QUERIES.INVOICE, {
    variables: { invoiceID: invoiceID ?? "" },
    fetchPolicy: "cache-only",
    skip: !invoiceID || !authenticatedUser?.id,
  });

  return loading || !data?.invoice ? (
    <Loading />
  ) : error ? (
    <ErrorDialog error={error} />
  ) : (
    <CoreItemView
      headerLabel="Invoice"
      headerComponents={
        <InvoiceItemViewHeader
          invoice={data?.invoice}
          isItemOwnedByUser={data.invoice.createdBy.id === authenticatedUser?.id}
        />
      }
      sx={invoiceItemViewSX}
    >
      <InvoiceItemViewContent invoice={data.invoice} />
    </CoreItemView>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = InvoiceItemView;

export const invoiceItemViewSX: SxPropsWithTheme = (theme) => ({
  [`& .${coreContentViewLayoutClassNames.childrenContainer}`]: {
    ...(!theme.variables.isMobilePageLayout && {
      padding: "2rem",
    }),
  },
});
