import { useNavigate } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import { PenToSquareIcon } from "@components/Icons/PenToSquareIcon";
import type { Invoice } from "@graphql/types";

export const UpdateInvoiceButton = ({
  invoice,
  ...props
}: { invoice: Invoice } & Omit<ButtonProps, "onClick" | "startIcon">) => {
  const nav = useNavigate();

  const handleClick = () => nav("/home/invoices/form", { state: { invoice } });

  return (
    <Button
      onClick={handleClick}
      startIcon={<PenToSquareIcon style={{ transform: "translateY(-2px)" }} />}
      {...props}
    >
      Update Invoice
    </Button>
  );
};
