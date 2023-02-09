import SvgIcon from "@mui/material/SvgIcon";
import DollarCheckmarkIcon from "@mui/icons-material/PriceCheckRounded";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import { FileInvoiceDollarIcon } from "./FileInvoiceDollarIcon";
import type { Invoice } from "@types";

export const InvoiceStatusIcon = ({
  status,
  ...props
}: {
  status: Invoice["status"];
} & React.ComponentProps<typeof SvgIcon>) => {
  const InvStatusIcon = INV_STATUS_ICONS[status];

  return <InvStatusIcon {...props} />;
};

export const INV_STATUS_ICONS: Record<Invoice["status"], typeof SvgIcon> = {
  OPEN: FileInvoiceDollarIcon as typeof SvgIcon,
  CLOSED: DollarCheckmarkIcon,
  DISPUTED: ExclamationMarkIcon
};

export const INV_STATUS_ICON_REACT_NODES: Record<Invoice["status"], React.ReactNode> = {
  OPEN: <FileInvoiceDollarIcon />,
  CLOSED: <DollarCheckmarkIcon />,
  DISPUTED: <ExclamationMarkIcon />
};
