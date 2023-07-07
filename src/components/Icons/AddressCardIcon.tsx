import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as AddressCardIconSVG } from "./assets/fa-address-card.svg";

/**
 * FontAwesome Address Card Icon
 */
export const AddressCardIcon = (props: SvgIconProps) => (
  <SvgIcon component={AddressCardIconSVG} inheritViewBox {...props} />
);
