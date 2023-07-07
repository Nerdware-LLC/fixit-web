import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as StripeIconSVG } from "./assets/stripe.svg";

/**
 * Stripe Icon
 */
export const StripeIcon = (props: SvgIconProps) => (
  <SvgIcon component={StripeIconSVG} inheritViewBox {...props} />
);
