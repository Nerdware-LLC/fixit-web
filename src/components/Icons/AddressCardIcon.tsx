import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import AddressCardIconSVG from "./assets/fa-address-card.svg?react";

/**
 * FontAwesome Address Card Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const AddressCardIcon = (props: SvgIconProps) => (
  <SvgIcon component={AddressCardIconSVG} inheritViewBox {...props} />
);
