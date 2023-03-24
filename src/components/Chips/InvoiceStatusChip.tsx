import Chip, { type ChipProps } from "@mui/material/Chip";
import { INV_STATUS_ICON_REACT_NODES } from "../Icons";
import type { Invoice } from "@types";

/**
 * Invoice `status` Mui Chip
 */
export const InvoiceStatusChip = ({
  status,
  ...props
}: {
  status: Extract<Invoice["status"], string>;
} & Omit<ChipProps, "avatar" | "icon">) => (
  <Chip
    label={status}
    icon={INV_STATUS_ICON_REACT_NODES[status] as React.ReactElement}
    {...props}
  />
);
