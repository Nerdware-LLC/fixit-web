import { useNavigate } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import { PenToSquareIcon } from "@/components/Icons/PenToSquareIcon.jsx";
import { APP_PATHS } from "@/routes/appPaths.js";
import type { Invoice } from "@/types/graphql.js";

export const UpdateInvoiceButton = ({
  invoice,
  ...props
}: { invoice: Invoice } & Omit<ButtonProps, "onClick" | "startIcon">) => {
  const nav = useNavigate();

  const handleClick = () => nav(APP_PATHS.INVOICES_FORM_VIEW, { state: { invoice } });

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
