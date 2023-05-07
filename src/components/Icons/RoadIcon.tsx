import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as RoadIconSVG } from "./assets/fa-road.svg";

/**
 * FontAwesome Road Icon
 */
export const RoadIcon = (props: SvgIconProps) => (
  <SvgIcon component={RoadIconSVG} inheritViewBox {...props} />
);
