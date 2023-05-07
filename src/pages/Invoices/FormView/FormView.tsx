import { useLocation } from "react-router-dom";
import { CoreItemView } from "@layouts/CoreItemView";
import { FormCreateInvoice } from "./FormCreateInvoice";
import { FormUpdateInvoice } from "./FormUpdateInvoice";

export const InvoiceFormView = () => {
  const { state: locationState } = useLocation();

  return (
    <CoreItemView headerLabel={locationState?.invoice ? "Update Invoice" : "Create Invoice"}>
      {locationState?.invoice ? (
        <FormUpdateInvoice invoice={locationState.invoice} />
      ) : (
        <FormCreateInvoice workOrderToInvoice={locationState?.workOrderToInvoice ?? null} />
      )}
    </CoreItemView>
  );
};
