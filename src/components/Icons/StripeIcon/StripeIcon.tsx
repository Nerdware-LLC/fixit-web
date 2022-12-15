import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as StripeIconSVG } from "./stripe.svg";

export const StripeIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={StripeIconSVG} inheritViewBox {...props} />;
};
