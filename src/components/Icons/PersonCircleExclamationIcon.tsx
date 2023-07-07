import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as PersonCircleExclamationIconSVG } from "./assets/fa-person-circle-exclamation.svg";

/**
 * FontAwesome Person Circle Exclamation Icon
 */
export const PersonCircleExclamationIcon = (props: SvgIconProps) => (
  <SvgIcon component={PersonCircleExclamationIconSVG} inheritViewBox {...props} />
);
