import DollarCheckmarkIcon from "@mui/icons-material/PriceCheckRounded";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import { FileInvoiceDollarIcon } from "./FileInvoiceDollarIcon";
import { StyledIconContainer } from "./StyledIconContainer";
import type { Invoice } from "@types";

export const InvoiceStatusIcon = ({
  status,
  style = {},
  ...props
}: {
  status: Invoice["status"];
} & React.ComponentProps<typeof StyledIconContainer>) => (
  <StyledIconContainer style={style} {...props}>
    {STATUS_ICONS[status]}
  </StyledIconContainer>
);

const STATUS_ICONS: Record<Invoice["status"], React.ReactNode> = {
  OPEN: <FileInvoiceDollarIcon sx={{ fontSize: 28, marginLeft: "2px" }} />,
  CLOSED: <DollarCheckmarkIcon sx={{ fontSize: 34, margin: "1px 0 0 1.5px" }} />,
  DISPUTED: <ExclamationMarkIcon sx={{ fontSize: 34 }} />
};
