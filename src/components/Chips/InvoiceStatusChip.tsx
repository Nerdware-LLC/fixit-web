import Chip, { type ChipProps } from "@mui/material/Chip";
import { INV_STATUS_ICON_REACT_NODES } from "../Icons/InvoiceStatusIcon";
import type { InvoiceStatus } from "@graphql/types";

/**
 * Invoice `status` Mui Chip
 */
export const InvoiceStatusChip = ({ status, ...props }: InvoiceStatusChipProps) => (
  <Chip label={status} icon={INV_STATUS_ICON_REACT_NODES[status]} {...props} />
);

export type InvoiceStatusChipProps = {
  status: InvoiceStatus;
} & Omit<ChipProps, "avatar" | "icon">;
