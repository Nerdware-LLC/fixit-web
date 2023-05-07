import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as FileInvoiceDollarIconSVG } from "./assets/fa-file-invoice-dollar.svg";

/**
 * FontAwesome File Invoice Dollar Icon
 */
export const FileInvoiceDollarIcon = (props: SvgIconProps) => (
  <SvgIcon component={FileInvoiceDollarIconSVG} inheritViewBox {...props} />
);
