import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import DollarCheckmarkIcon from "@mui/icons-material/PriceCheckRounded";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import { FileInvoiceDollarIcon } from "./FileInvoiceDollarIcon";
import type { InvoiceStatus } from "@graphql/types";

export const InvoiceStatusIcon = ({ status, ...props }: InvoiceStatusIconProps) => {
  const InvStatusIcon = INV_STATUS_ICONS[status];

  return <InvStatusIcon {...props} />;
};

export const INV_STATUS_ICONS: Record<InvoiceStatus, typeof SvgIcon> = {
  OPEN: FileInvoiceDollarIcon as typeof SvgIcon,
  CLOSED: DollarCheckmarkIcon,
  DISPUTED: ExclamationMarkIcon,
};

export const INV_STATUS_ICON_REACT_NODES: Record<InvoiceStatus, React.ReactElement> = {
  OPEN: <FileInvoiceDollarIcon />,
  CLOSED: <DollarCheckmarkIcon />,
  DISPUTED: <ExclamationMarkIcon />,
};

export type InvoiceStatusIconProps = {
  status: InvoiceStatus;
} & SvgIconProps;
