import React, { forwardRef } from "react";
import DollarCheckmarkIcon from "@mui/icons-material/PriceCheckRounded";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { FileInvoiceDollarIcon } from "./FileInvoiceDollarIcon.jsx";
import type { InvoiceStatus } from "@/types/graphql.js";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const InvoiceStatusIcon = forwardRef<SVGSVGElement, InvoiceStatusIconProps>(
  function InvoiceStatusIcon({ status, ...svgIconProps }, ref) {
    const svgRef = useMaybeRef(ref);

    const StatusIcon = INVOICE_STATUS_ICONS[status];

    return <StatusIcon ref={svgRef} {...svgIconProps} />;
  }
);

/**
 * Map of {@link InvoiceStatus|Invoice statuses} to their corresponding icon component.
 */
export const INVOICE_STATUS_ICONS = {
  OPEN: FileInvoiceDollarIcon,
  CLOSED: DollarCheckmarkIcon,
  DISPUTED: ExclamationMarkIcon,
} as const satisfies Record<InvoiceStatus, React.ComponentType>;

/**
 * Map of {@link InvoiceStatus|Invoice statuses} to their corresponding icon as JSX.
 * > If you need to pass props to the icon, use {@link INVOICE_STATUS_ICONS} instead.
 */
export const INVOICE_STATUS_ICONS_JSX = Object.fromEntries(
  Object.entries(INVOICE_STATUS_ICONS).map(([status, Icon]) => [status, <Icon key={status} />])
) as Record<InvoiceStatus, JSX.Element>;

export type InvoiceStatusIconProps = {
  status: InvoiceStatus;
} & SvgIconProps;
