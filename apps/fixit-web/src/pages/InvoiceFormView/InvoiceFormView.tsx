import { useLocation, type Location } from "react-router-dom";
import { CoreItemView } from "@/layouts/CoreItemView";
import { FormCreateInvoice } from "./FormCreateInvoice.jsx";
import { FormUpdateInvoice } from "./FormUpdateInvoice.jsx";
import type { WorkOrder, Invoice } from "@/types/graphql.js";

export const InvoiceFormView = () => {
  const { state: locationState } = useLocation() as Location<{
    invoice?: Invoice | null;
    workOrderToInvoice?: WorkOrder | null;
  }>;

  return (
    <CoreItemView headerLabel={locationState.invoice ? "Update Invoice" : "Create Invoice"}>
      {locationState.invoice ? (
        <FormUpdateInvoice invoice={locationState.invoice} />
      ) : (
        <FormCreateInvoice workOrderToInvoice={locationState.workOrderToInvoice ?? null} />
      )}
    </CoreItemView>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = InvoiceFormView;
