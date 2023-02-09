import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { PenToSquareIcon } from "@components";
import type { Invoice } from "@types";

export const UpdateInvoiceButton = ({
  invoice,
  ...props
}: {
  invoice: Invoice;
} & Partial<React.ComponentProps<typeof Button>>) => {
  const nav = useNavigate();

  const handleClick = () => nav("/home/invoices/form", { state: { invoice } });

  return (
    <Button
      onClick={handleClick}
      startIcon={<PenToSquareIcon style={{ marginRight: "0.1rem" }} />}
      {...props}
    >
      Update Invoice
    </Button>
  );
};
