import { useLocation } from "react-router-dom";
import { FormCreateInvoice } from "./FormCreateInvoice";
import { FormUpdateInvoice } from "./FormUpdateInvoice";

export const InvoiceFormView = () => {
  const { state: locationState } = useLocation();

  const title = locationState?.invoice ? "Update Invoice" : "Create Invoice";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h2>{title}</h2>
      {locationState?.invoice ? (
        <FormUpdateInvoice invoice={locationState.invoice} />
      ) : (
        <FormCreateInvoice workOrderToInvoice={locationState?.workOrderToInvoice ?? null} />
      )}
    </div>
  );
};
