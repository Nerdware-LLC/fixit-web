import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as PersonCircleExclamationIconSVG } from "./fa-person-circle-exclamation.svg";

export const PersonCircleExclamationIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={PersonCircleExclamationIconSVG} inheritViewBox {...props} />;
};
