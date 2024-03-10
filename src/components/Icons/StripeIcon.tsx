import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import StripeIconSVG from "./assets/stripe.svg?react";

/**
 * Stripe Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const StripeIcon = (props: SvgIconProps) => (
  <SvgIcon component={StripeIconSVG} inheritViewBox {...props} />
);
