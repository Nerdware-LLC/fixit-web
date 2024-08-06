import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Loading, ErrorDialog } from "@/components/Indicators";
import { QUERIES } from "@/graphql/queries.js";
import { coreContentViewLayoutClassNames } from "@/layouts/CoreContentViewLayout/classNames.js";
import { CoreItemView } from "@/layouts/CoreItemView";
import { InvoiceItemViewContent } from "./InvoiceItemViewContent.jsx";
import { InvoiceItemViewHeader } from "./InvoiceItemViewHeader.jsx";
import type { SxPropsWithTheme } from "@/app/ThemeProvider/helpers.js";

export const InvoiceItemView = () => {
  const { id: invoiceID } = useParams();

  const { data, loading, error } = useQuery(QUERIES.INVOICE, {
    variables: { invoiceID: invoiceID ?? "" },
    fetchPolicy: "cache-only",
    skip: !invoiceID,
  });

  return loading || !data?.invoice ? (
    <Loading />
  ) : error ? (
    <ErrorDialog error={error} />
  ) : (
    <CoreItemView
      headerLabel="Invoice"
      headerComponents={<InvoiceItemViewHeader invoice={data.invoice} />}
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
