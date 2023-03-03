import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as AddressCardIconSVG } from "./fa-address-card.svg";

export const AddressCardIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={AddressCardIconSVG} inheritViewBox {...props} />;
};
