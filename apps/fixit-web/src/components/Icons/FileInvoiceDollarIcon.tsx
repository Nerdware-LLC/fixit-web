import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import FileInvoiceDollarIconSVG from "./assets/fa-file-invoice-dollar.svg?react";

/**
 * FontAwesome File Invoice Dollar Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const FileInvoiceDollarIcon = (props: SvgIconProps) => (
  <SvgIcon component={FileInvoiceDollarIconSVG} inheritViewBox {...props} />
);
