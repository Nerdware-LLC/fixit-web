import { INVOICE_STATUS_ICONS_JSX } from "@/components/Icons/InvoiceStatusIcon.jsx";
import { StyledChip, type StyledChipProps } from "./StyledChip.jsx";
import type { InvoiceStatus } from "@/types/graphql.js";
import type { Except } from "type-fest";

/**
 * {@link InvoiceStatus|Invoice `status`} Mui Chip
 */
export const InvoiceStatusChip = ({ status, ...chipProps }: InvoiceStatusChipProps) => (
  <StyledChip label={status} icon={INVOICE_STATUS_ICONS_JSX[status]} {...chipProps} />
);

export type InvoiceStatusChipProps = {
  status: InvoiceStatus;
} & Except<StyledChipProps, "label" | "icon" | "children" | "avatar" | "component">;
