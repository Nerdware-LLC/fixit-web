import { INVOICE_STATUS_ICONS_JSX } from "@/components/Icons/InvoiceStatusIcon";
import { StyledChip, type StyledChipProps } from "./StyledChip";
import type { InvoiceStatus } from "@/graphql/types";
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
