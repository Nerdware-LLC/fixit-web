import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as FileInvoiceDollarIconSVG } from "./fa-file-invoice-dollar.svg";

export const FileInvoiceDollarIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={FileInvoiceDollarIconSVG} inheritViewBox {...props} />;
};
